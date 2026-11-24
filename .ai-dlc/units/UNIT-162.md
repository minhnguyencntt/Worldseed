# UNIT-162 — Act: Implement the JSON execution store and startup recovery

## Summary
Add state.Store and recovery.Run

## Description
Implement the store and recovery packages; no tests here.

## How to act
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `worker/internal/state/state.go` · `new: Execution, Store, Save, Load, List` · new
- **Do:** Define Status constants QUEUED, RUNNING, AWAITING_APPROVAL, APPROVED, FAILED, COMPLETED, RECOVERING. Execution{ID, World, Round string; Status Status; Attempt int; CostUSD float64; Error string; StartedAt, UpdatedAt time.Time} with json tags. Store{Dir string; Now func() time.Time}. Save sets UpdatedAt=Now(), validates ID with a regexp ^[A-Za-z0-9._-]+$ (no '..'), marshals indented JSON and writes via CreateTemp+Rename in Dir. Load(id) returns fs.ErrNotExist-wrapping error when missing. List returns every *.json sorted by ID, ignoring *.report.json
- **Expected:** Round trip preserves all fields; unsafe ID returns an error

### Step 2 — `worker/internal/recovery/recovery.go` · `new: Run, Options, Result` · new
- **Do:** Options{Store *state.Store; LockPath string; MaxRetries int; Alive func(pid int) bool; Log *slog.Logger}. Run(ctx) ([]Result, error): if LockPath exists and lock.Owner content is 'pid:<n>' with Alive(n) false, os.Remove it. For each List() execution with Status RUNNING or QUEUED: if Attempt < MaxRetries set Status QUEUED and Error 'resumed after restart' else set Status RECOVERING and Error 'interrupted; attempts exhausted'; Save; append Result{ID, Action resumed|marked}. Log each at Info. Leave other statuses unchanged

```
type Result struct{ ID, Action string }
```

- **Expected:** Results list one entry per unfinished execution

## Acceptance criteria
- state.Store Save/Load/List work on <dir>/<id>.json
- recovery.Run resumes or marks unfinished executions and clears stale locks

## Definition of done
- go build ./... passes
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-162.md`

## Scan baseline
- Scan version: `v1`
- Scan tip: `9cda5131c65b08541fc685d8a0898d39a0e9e9fa`

## Links
- Evidence: EVD-035
- Requirement: REQ-082
- Unit (Act): UNIT-162
- Unit (Verify): UNIT-167
- Status: completed
- Change: UPDATE
