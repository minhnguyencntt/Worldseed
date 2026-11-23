// Package runner executes one worker Execution: it takes the per-World lock,
// records the RUNNING state, prepares a work directory, runs the agent under a
// timeout with retries within the cost budget and persists the final status.
package runner

import (
	"context"
	"errors"
	"fmt"
	"path/filepath"
	"time"

	"github.com/worldseed/storyforge/worker/internal/lock"
	"github.com/worldseed/storyforge/worker/internal/report"
	"github.com/worldseed/storyforge/worker/internal/store"
)

// ErrBudgetExceeded is returned (wrapped) when the accumulated agent cost of an
// execution goes over Config.MaxBudget, which stops further retries.
var ErrBudgetExceeded = errors.New("runner: budget exceeded")

// Agent performs the work for one execution inside workDir and reports its cost.
type Agent interface {
	Run(ctx context.Context, workDir string) (cost float64, err error)
}

// Worktrees prepares and removes the per-execution working directory.
type Worktrees interface {
	Create(ctx context.Context, dir string) error
	Remove(ctx context.Context, dir string) error
}

// Publisher publishes the results found in workDir.
type Publisher interface {
	Publish(ctx context.Context, workDir string) error
}

// Config holds the runner settings.
type Config struct {
	LockPath    string
	WorkRoot    string
	Timeout     time.Duration
	MaxRetries  int
	MaxBudget   float64
	AutoPublish bool
}

// Reporter writes the report for one finished execution.
type Reporter interface {
	Write(report.Report) error
}

// Runner executes worker Executions using the configured lock, store, agent,
// worktrees and publisher.
type Runner struct {
	cfg      Config
	st       *store.Store
	agent    Agent
	trees    Worktrees
	pub      Publisher
	now      func() time.Time
	reporter Reporter
}

// SetReporter sets the reporter that receives a report for every outcome of
// Run. A nil reporter disables reports.
func (r *Runner) SetReporter(rep Reporter) {
	r.reporter = rep
}

// New returns a Runner that uses the given dependencies.
func New(cfg Config, st *store.Store, a Agent, t Worktrees, p Publisher, now func() time.Time) *Runner {
	return &Runner{
		cfg:   cfg,
		st:    st,
		agent: a,
		trees: t,
		pub:   p,
		now:   now,
	}
}

// Run executes the execution id for roundID and, once the lock was taken, writes
// a report for the outcome through the reporter (if one is set). It returns
// lock.ErrLocked (wrapped) if another run holds the lock; no report is written
// in that case.
func (r *Runner) Run(ctx context.Context, id, roundID string) (store.Execution, error) {
	start := r.now()
	e, err := r.run(ctx, id, roundID)
	if e.ID == "" {
		// Lock failure: nothing was run, so there is nothing to report.
		return e, err
	}
	if r.reporter != nil {
		errText := e.Error
		if errText == "" && err != nil {
			errText = err.Error()
		}
		finished := r.now()
		rep := report.Report{
			ExecutionID: e.ID,
			RoundID:     e.RoundID,
			Status:      e.Status,
			Attempts:    e.Attempt,
			Error:       errText,
			StartedAt:   start,
			FinishedAt:  finished,
			DurationMS:  finished.Sub(start).Milliseconds(),
		}
		if werr := r.reporter.Write(rep); werr != nil && err == nil {
			return e, fmt.Errorf("runner: write report: %w", werr)
		}
	}
	return e, err
}

// run executes the execution id for roundID. It returns lock.ErrLocked (wrapped)
// if another run holds the lock. A failing agent run, including timeout, is
// retried up to Config.MaxRetries times; each attempt gets its own Timeout.
// Retries stop early with ErrBudgetExceeded (wrapped) once the accumulated
// agent cost is over Config.MaxBudget (a zero or negative budget is unlimited).
// When the agent gives up, the stored record is FAILED with the last error
// text and that error is returned.
func (r *Runner) run(ctx context.Context, id, roundID string) (store.Execution, error) {
	l, err := lock.Acquire(r.cfg.LockPath)
	if err != nil {
		return store.Execution{}, fmt.Errorf("runner: %w", err)
	}
	defer func() { _ = l.Release() }()

	e := store.Execution{
		ID:        id,
		RoundID:   roundID,
		Status:    store.StatusRunning,
		CreatedAt: r.now(),
		UpdatedAt: r.now(),
	}
	if err := r.st.Save(e); err != nil {
		return e, err
	}

	dir := filepath.Join(r.cfg.WorkRoot, id)
	if err := r.trees.Create(ctx, dir); err != nil {
		return e, fmt.Errorf("runner: create worktree: %w", err)
	}

	var spent float64
	for attempt := 1; ; attempt++ {
		e.Attempt = attempt
		cost, runErr := r.runAttempt(ctx, dir)
		spent += cost
		err = runErr
		if err == nil {
			break
		}
		if attempt > r.cfg.MaxRetries {
			break
		}
		if r.cfg.MaxBudget > 0 && spent > r.cfg.MaxBudget {
			err = fmt.Errorf("%w: spent %.2f of %.2f after attempt %d: %w",
				ErrBudgetExceeded, spent, r.cfg.MaxBudget, attempt, err)
			break
		}
	}

	if err != nil {
		e.Status = store.StatusFailed
		e.Error = err.Error()
		e.UpdatedAt = r.now()
		if serr := r.st.Save(e); serr != nil {
			return e, serr
		}
		if rerr := r.trees.Remove(ctx, dir); rerr != nil {
			return e, rerr
		}
		return e, err
	}

	if !r.cfg.AutoPublish {
		// Approval gate: keep the work directory and wait for an explicit approval
		// before anything is published.
		e.Status = store.StatusAwaitingApproval
		e.UpdatedAt = r.now()
		if err := r.st.Save(e); err != nil {
			return e, err
		}
		return e, nil
	}

	if perr := r.pub.Publish(ctx, dir); perr != nil {
		e.Status = store.StatusFailed
		e.Error = perr.Error()
		e.UpdatedAt = r.now()
		if serr := r.st.Save(e); serr != nil {
			return e, serr
		}
		if rerr := r.trees.Remove(ctx, dir); rerr != nil {
			return e, rerr
		}
		return e, fmt.Errorf("runner: publish: %w", perr)
	}

	e.Status = store.StatusCompleted
	e.UpdatedAt = r.now()
	if err := r.st.Save(e); err != nil {
		return e, err
	}
	if err := r.trees.Remove(ctx, dir); err != nil {
		return e, fmt.Errorf("runner: remove worktree: %w", err)
	}
	return e, nil
}

// runAttempt runs the agent once in dir under a fresh Timeout and returns its cost.
func (r *Runner) runAttempt(ctx context.Context, dir string) (float64, error) {
	tctx, cancel := context.WithTimeout(ctx, r.cfg.Timeout)
	defer cancel()
	return r.agent.Run(tctx, dir)
}
