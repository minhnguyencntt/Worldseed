# UNIT-183 — Act: Create the runner package with lock, worktree and timeout

## Summary
Add runner.go with interfaces, Config, New and Run

## Description
Create backend/worker/internal/runner/runner.go defining Agent, Worktrees, Publisher, Config, Runner, New and Run that locks, saves RUNNING, creates the worktree, runs the agent once under the timeout and saves the final status.

## How to act
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `backend/worker/internal/runner/runner.go` · `new: interfaces Agent, Worktrees, Publisher and type Config` · new
- **Do:** Create package runner importing context, errors, fmt, path/filepath, time, github.com/worldseed/storyforge/worker/internal/lock and .../internal/store. Declare Agent, Worktrees, Publisher interfaces and Config struct.

```
type Agent interface{ Run(ctx context.Context, workDir string) (cost float64, err error) }
type Worktrees interface{ Create(ctx context.Context, dir string) error; Remove(ctx context.Context, dir string) error }
type Publisher interface{ Publish(ctx context.Context, workDir string) error }
type Config struct{ LockPath, WorkRoot string; Timeout time.Duration; MaxRetries int; MaxBudget float64; AutoPublish bool }
```

- **Expected:** Package compiles with the four declarations

### Step 2 — `backend/worker/internal/runner/runner.go` · `new: Runner, New` · new
- **Do:** Declare Runner holding cfg Config, st *store.Store, agent Agent, trees Worktrees, pub Publisher, now func() time.Time, and New(cfg, st, agent, trees, pub, now) *Runner assigning each field.

```
func New(cfg Config, st *store.Store, a Agent, t Worktrees, p Publisher, now func() time.Time) *Runner
```

- **Expected:** New returns a populated *Runner

### Step 3 — `backend/worker/internal/runner/runner.go` · `new: Runner.Run` · new
- **Do:** Implement Run(ctx, id, roundID string) (store.Execution, error): (1) l, err := lock.Acquire(cfg.LockPath); on err return store.Execution{}, fmt.Errorf("runner: %w", err); defer l.Release(). (2) build e := store.Execution{ID:id, RoundID:roundID, Status:store.StatusRunning, CreatedAt:r.now(), UpdatedAt:r.now()} and st.Save(e), returning the error. (3) dir := filepath.Join(cfg.WorkRoot, id); call trees.Create(ctx, dir), on error fail. (4) tctx, cancel := context.WithTimeout(ctx, cfg.Timeout); defer cancel(). (5) e.Attempt = 1; _, err = agent.Run(tctx, dir). (6) on err set e.Status=StatusFailed, e.Error=err.Error(), UpdatedAt, Save, call trees.Remove(ctx, dir), return e, err. (7) on success set e.Status=StatusCompleted, Save, trees.Remove(ctx, dir), return e, nil.
- **Expected:** Held lock returns lock.ErrLocked; timeout yields FAILED with DeadlineExceeded

## Acceptance criteria
- Run returns a lock.ErrLocked-wrapping error when the lock is held
- Run applies cfg.Timeout via context.WithTimeout

## Definition of done
- go build ./internal/runner passes
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-183.md`

## Scan baseline
- Scan version: `v1`
- Scan tip: `9cda5131c65b08541fc685d8a0898d39a0e9e9fa`

## Links
- Evidence: EVD-038
- Requirement: REQ-092
- Unit (Act): UNIT-183
- Unit (Verify): UNIT-186
- Status: completed
- Change: UPDATE
