# UNIT-205 — Act: Confirm lock-first ordering and budget stop in Runner.run

## Summary
Confirm lock acquisition precedes store and worktree work and the budget check wraps ErrBudgetExceeded

## Description
Read the start of Runner.run and the budget condition; lock.Acquire happens before store.Save and trees.Create, and the budget branch wraps ErrBudgetExceeded. No change unless a defect is found.

## How to act
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `backend/worker/internal/runner/runner.go` · `Runner.run` · L124-L170
- **Do:** Confirm lock.Acquire(r.cfg.LockPath) precedes r.st.Save(e) and r.trees.Create, and that the budget branch is guarded by r.cfg.MaxBudget > 0 && spent > r.cfg.MaxBudget and builds the error with ErrBudgetExceeded; edit only if false.
- **Expected:** Ordering and condition hold with no edit required

## Acceptance criteria
- lock.Acquire is called before r.st.Save and r.trees.Create
- Budget branch requires MaxBudget > 0 and spent > MaxBudget and wraps ErrBudgetExceeded

## Definition of done
- Ordering and condition confirmed by reading
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-205.md`

## Scan baseline
- Scan version: `v1`
- Scan tip: `9cda5131c65b08541fc685d8a0898d39a0e9e9fa`

## Links
- Evidence: EVD-041
- Requirement: REQ-104
- Unit (Act): UNIT-205
- Unit (Verify): UNIT-208
- Status: completed
- Change: UPDATE
