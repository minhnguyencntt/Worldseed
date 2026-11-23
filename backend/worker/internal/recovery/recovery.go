// Package recovery resumes or marks worker executions that were left in an
// interrupted state (PENDING, RUNNING or RECOVERING) after a worker restart.
package recovery

import (
	"context"
	"fmt"
	"time"

	"github.com/worldseed/storyforge/worker/internal/store"
)

// ExecutionStore is the subset of the execution store used for recovery.
type ExecutionStore interface {
	List() ([]store.Execution, error)
	Save(store.Execution) error
}

// Resumer resumes one interrupted execution.
type Resumer interface {
	Resume(ctx context.Context, e store.Execution) error
}

// Config holds the recovery settings.
type Config struct {
	LockPath   string
	StaleAfter time.Duration
}

// Result reports what a Recover pass did, in execution ID order.
type Result struct {
	Resumed      []string
	Marked       []string
	LockReleased bool
}

// Recoverer scans stored executions and resumes or marks interrupted ones.
type Recoverer struct {
	st      ExecutionStore
	resumer Resumer
	lockFS  LockFS
	now     func() time.Time
	cfg     Config
}

// New returns a Recoverer that uses cfg, st, r, lfs and now.
func New(cfg Config, st ExecutionStore, r Resumer, lfs LockFS, now func() time.Time) *Recoverer {
	return &Recoverer{cfg: cfg, st: st, resumer: r, lockFS: lfs, now: now}
}

// Recover resumes every execution in PENDING, RUNNING or RECOVERING state.
// A failed resume marks the execution RECOVERING with the error text and
// continues with the next one. Other statuses are skipped.
func (r *Recoverer) Recover(ctx context.Context) (Result, error) {
	var res Result

	list, err := r.st.List()
	if err != nil {
		return res, fmt.Errorf("recovery: list: %w", err)
	}

	for _, e := range list {
		switch e.Status {
		case store.StatusPending, store.StatusRunning, store.StatusRecovering:
		default:
			continue
		}

		if err := r.resumer.Resume(ctx, e); err == nil {
			res.Resumed = append(res.Resumed, e.ID)
			continue
		} else {
			e.Status = store.StatusRecovering
			e.Error = err.Error()
			e.UpdatedAt = r.now()
			if serr := r.st.Save(e); serr != nil {
				return res, fmt.Errorf("recovery: save %s: %w", e.ID, serr)
			}
			res.Marked = append(res.Marked, e.ID)
		}
	}

	return res, nil
}
