# UNIT-204 — Act: Confirm retry loop and failure cleanup in Runner.run

## Summary
Confirm the loop stops after MaxRetries and the failure path removes the worktree once

## Description
Read the retry loop and failure branch in Runner.run; they already break when attempt > MaxRetries and call trees.Remove once. Make no change unless a defect is found.

## How to act
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `backend/worker/internal/runner/runner.go` · `Runner.run` · L147-L180
- **Do:** Confirm the for loop sets e.Attempt = attempt, breaks on nil error, breaks when attempt > r.cfg.MaxRetries, and that the err != nil branch sets Status to store.StatusFailed, Error to err.Error(), saves, then calls r.trees.Remove(ctx, dir) once; edit only if any of these is false.
- **Expected:** All listed conditions hold with no edit required

## Acceptance criteria
- Loop breaks when attempt > cfg.MaxRetries
- Failure branch saves FAILED with Error text then calls trees.Remove exactly once

## Definition of done
- Loop and failure branch confirmed correct by reading
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-204.md`

## Scan baseline
- Scan version: `v1`
- Scan tip: `9cda5131c65b08541fc685d8a0898d39a0e9e9fa`

## Links
- Evidence: EVD-041
- Requirement: REQ-103
- Unit (Act): UNIT-204
- Unit (Verify): UNIT-207
- Status: completed
- Change: UPDATE
