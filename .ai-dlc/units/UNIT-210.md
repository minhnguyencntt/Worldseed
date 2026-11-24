# UNIT-210 — Act: Implement Recoverer.Recover scan, resume and mark

## Summary
Create the recovery package that resumes unfinished executions and marks failures RECOVERING.

## Description
Create backend/worker/internal/recovery/recovery.go with the interfaces, Recoverer, New and Recover.

## How to act
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `backend/worker/internal/recovery/recovery.go` · `new: ExecutionStore, Resumer, Config, Result, Recoverer, New` · new
- **Do:** Create package recovery with interface ExecutionStore {List() ([]store.Execution, error); Save(store.Execution) error}, interface Resumer {Resume(ctx context.Context, e store.Execution) error}, struct Config {LockPath string; StaleAfter time.Duration}, struct Result {Resumed []string; Marked []string; LockReleased bool}, struct Recoverer holding st, resumer, lockFS LockFS, now func() time.Time, cfg Config, and constructor New(cfg Config, st ExecutionStore, r Resumer, lfs LockFS, now func() time.Time) *Recoverer.

```
func New(cfg Config, st ExecutionStore, r Resumer, lfs LockFS, now func() time.Time) *Recoverer { return &Recoverer{cfg: cfg, st: st, resumer: r, lockFS: lfs, now: now} }
```

- **Expected:** Package declares the types; compiles together with the lock-file Act.

### Step 2 — `backend/worker/internal/recovery/recovery.go` · `new: (*Recoverer).Recover` · new
- **Do:** Implement Recover(ctx) (Result, error): call st.List, wrap error as fmt.Errorf("recovery: list: %w", err). For each execution whose Status is store.StatusPending, StatusRunning or StatusRecovering call resumer.Resume; on nil append ID to Result.Resumed; on error set e.Status=store.StatusRecovering, e.Error=err.Error(), e.UpdatedAt=r.now(), call st.Save (return fmt.Errorf("recovery: save %s: %w") on failure, with the result so far), append ID to Result.Marked and continue. Skip all other statuses.

```
switch e.Status { case store.StatusPending, store.StatusRunning, store.StatusRecovering: default: continue }
```

- **Expected:** Recover returns Resumed and Marked IDs in ID order.

## Acceptance criteria
- Recover resumes PENDING, RUNNING and RECOVERING executions only
- A Resume error leads to a saved RECOVERING record and processing continues

## Definition of done
- Package builds
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-210.md`

## Scan baseline
- Scan version: `v1`
- Scan tip: `9cda5131c65b08541fc685d8a0898d39a0e9e9fa`

## Links
- Evidence: EVD-042
- Requirement: REQ-105
- Unit (Act): UNIT-210
- Unit (Verify): UNIT-213
- Unit (Verify): UNIT-214
- Status: completed
- Change: UPDATE
