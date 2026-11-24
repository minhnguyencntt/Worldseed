# UNIT-094 — Verify: NewScheduler wiring unit tests

## Summary
Unit tests prove NewScheduler uses config values

## Description
Run and, where absent, add a unit test for NewScheduler using a temp dir repo path and no real clock or network.

## How to verify
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `backend/internal/server/server_test.go` · `TestNewScheduler_UsesConfig` · L331-L346
- **Do:** Confirm the test builds config.Config with SchedulerInterval 7s and a t.TempDir() RepoPath, calls NewScheduler and asserts Interval == 7s and Controller and Rounds non-nil; add the assertions if absent.
- **Run:** `cd backend && go test ./internal/server -run TestNewScheduler_UsesConfig`
- **Expected:** Test passes

## Acceptance criteria
- Interval equals configured 7s
- Controller and Rounds are non-nil

## Definition of done
- Test passes
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-094.md`

## Links
- Evidence: EVD-018
- Requirement: REQ-047
- Unit (Act): UNIT-092
- Unit (Verify): UNIT-094
- Status: completed
- Change: UPDATE
