# UNIT-197 — Act: Confirm approval gate and worktree cleanup paths in Runner

## Summary
Confirm the gate keeps the worktree and failures and completion remove it

## Description
Read run and confirm AutoPublish false saves AWAITING_APPROVAL without Remove, and failure, publish error and completion paths call Worktrees.Remove. No product change is expected; the failing TestRunCleanup is a stale test expectation.

## How to act
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `backend/worker/internal/runner/runner.go` · `Runner.run` · L168-L211
- **Do:** Confirm the !r.cfg.AutoPublish branch saves StatusAwaitingApproval and returns without r.trees.Remove, while the failure, publish-error and completed branches call r.trees.Remove; change nothing if so.
- **Run:** `cd backend/worker && go build ./internal/runner`
- **Expected:** Build succeeds; gate and cleanup confirmed

## Acceptance criteria
- Given runner.go, When read, Then AutoPublish false returns without calling trees.Remove
- Given runner.go, When read, Then agent failure, publish failure and completion each call trees.Remove

## Definition of done
- Code confirmed; go build succeeds
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-197.md`

## Scan baseline
- Scan version: `v1`
- Scan tip: `9cda5131c65b08541fc685d8a0898d39a0e9e9fa`

## Links
- Evidence: EVD-040
- Requirement: REQ-100
- Unit (Act): UNIT-197
- Unit (Verify): UNIT-201
- Status: completed
- Change: UPDATE
