# UNIT-164 — Act: Implement the execution runner with retry, budget, timeout and approval gate

## Summary
Add runner.Runner, Run, Publish and report writing

## Description
Implement orchestration in worker/internal/runner using the lock and state packages.

## How to act
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `worker/internal/runner/report.go` · `new: Report, WriteReport` · new
- **Do:** Report{ExecutionID, World, Round, Status string; Attempts int; CostUSD float64; Error string; StartedAt, FinishedAt time.Time; Mock bool} with json tags. WriteReport(repoRoot string, r Report) writes development/executions/<id>.report.json atomically (CreateTemp+Rename), validating ExecutionID like state.Store
- **Expected:** Report file exists as indented JSON

### Step 2 — `worker/internal/runner/runner.go` · `new: Runner, Run` · new
- **Do:** Define interfaces Agent and Worktrees as in the requirement and Runner{Cfg config.Config; Store *state.Store; Agent Agent; Trees Worktrees; LockPath, Prompt string; Now func() time.Time}. Run(ctx, exec state.Execution) error: lock.Acquire(LockPath, 'pid:<os.Getpid()>') (return ErrLocked as-is), defer Release; Trees.Add(ctx, filepath.Join(Cfg.WorkRoot,'worktrees',exec.ID), 'dev/'+exec.ID, 'HEAD') and defer Trees.Remove with context.WithoutCancel(ctx); set RUNNING and Save; loop attempt 0..Cfg.MaxRetries: if exec.CostUSD >= Cfg.MaxBudgetUSD return ErrBudgetExceeded after marking FAILED; actx,cancel := context.WithTimeout(ctx, Cfg.ExecTimeout); cost,_,err := Agent.Run(actx, worktreePath, Prompt); add cost to exec.CostUSD; map actx.Err()==DeadlineExceeded to ErrTimeout; Attempt++ and Save; on success set AWAITING_APPROVAL (or APPROVED when Cfg.AutoPublish) and break; on exhausting attempts set FAILED with Error. Always WriteReport (Mock from Cfg.Provider.Kind=='mock')
- **Expected:** Run follows the lifecycle and reports each outcome

### Step 3 — `worker/internal/runner/runner.go` · `new: Publish, ErrNotApproved, ErrBudgetExceeded, ErrTimeout` · after Run
- **Do:** Add sentinel errors and (r *Runner) Publish(ctx, id string, publish func(ctx context.Context) error) error that Loads the record, returns ErrNotApproved unless Status is APPROVED, otherwise calls publish and sets COMPLETED
- **Expected:** Publish never runs the callback for unapproved executions

## Acceptance criteria
- Run enforces lock, timeout, retries, budget and approval gate
- Reports are written atomically

## Definition of done
- go build ./... passes
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-164.md`

## Scan baseline
- Scan version: `v1`
- Scan tip: `9cda5131c65b08541fc685d8a0898d39a0e9e9fa`

## Links
- Evidence: EVD-035
- Requirement: REQ-084
- Unit (Act): UNIT-164
- Unit (Verify): UNIT-169
- Status: completed
- Change: UPDATE
