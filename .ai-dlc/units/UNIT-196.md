# UNIT-196 — Act: Confirm retry loop and budget condition in Runner

## Summary
Confirm attempt > MaxRetries and spent > MaxBudget with MaxBudget > 0 conditions

## Description
Read the loop in run and confirm the break conditions match the documented semantics; no product change is expected.

## How to act
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `backend/worker/internal/runner/runner.go` · `Runner.run` · L148-L166
- **Do:** Confirm the loop breaks at 'attempt > r.cfg.MaxRetries' and wraps ErrBudgetExceeded only under 'r.cfg.MaxBudget > 0 && spent > r.cfg.MaxBudget'; change nothing if so.
- **Run:** `cd backend/worker && go build ./internal/runner`
- **Expected:** Build succeeds; conditions confirmed

## Acceptance criteria
- Given runner.go, When read, Then the loop breaks when attempt > MaxRetries
- Given runner.go, When read, Then budget stops only when MaxBudget > 0 and spent > MaxBudget

## Definition of done
- Code confirmed; go build succeeds
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-196.md`

## Scan baseline
- Scan version: `v1`
- Scan tip: `9cda5131c65b08541fc685d8a0898d39a0e9e9fa`

## Links
- Evidence: EVD-040
- Requirement: REQ-099
- Unit (Act): UNIT-196
- Unit (Verify): UNIT-200
- Status: completed
- Change: UPDATE
