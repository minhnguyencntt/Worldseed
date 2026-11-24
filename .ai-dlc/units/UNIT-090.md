# UNIT-090 — Verify: Tick ignores non-due rounds and survives open failure unit tests

## Summary
Unit tests for skip logic and continue-on-error with fakes

## Description
Tests use the fakes in scheduler_test.go and advance fakeClock manually.

## How to verify
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `backend/internal/round/scheduler_test.go` · `TestTick_IgnoresFutureAndOtherStatuses` · L106-L137
- **Do:** Run the test: no calls at 12:00, then set clock.now to 13:00 and assert open future-scheduled then close future-open. Keep it as is if it passes.
- **Run:** `cd backend && go test -count=1 -run 'TestTick_IgnoresFutureAndOtherStatuses$' ./internal/round/`
- **Expected:** Test passes with ok.

### Step 2 — `backend/internal/round/scheduler_test.go` · `TestTick_OpenErrorIsReturnedAndCloseStillRuns` · L140-L165
- **Do:** Run the test with fakeController{openErr} and assert errors.Is(err, openErr) and calls [open due-scheduled, close expired-open]. Keep it as is if it passes.
- **Run:** `cd backend && go test -count=1 -run 'TestTick_OpenErrorIsReturnedAndCloseStillRuns$' ./internal/round/`
- **Expected:** Test passes with ok.

## Acceptance criteria
- TestTick_IgnoresFutureAndOtherStatuses asserts zero calls at 12:00 and open plus close calls at 13:00.
- TestTick_OpenErrorIsReturnedAndCloseStillRuns asserts errors.Is(err, openErr) and that the close call is recorded after the failed open.

## Definition of done
- Both tests pass with -count=1
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-090.md`

## Links
- Evidence: EVD-017
- Requirement: REQ-045
- Unit (Act): UNIT-088
- Unit (Verify): UNIT-090
- Status: completed
- Change: UPDATE
