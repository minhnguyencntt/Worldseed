# UNIT-101 — Verify: Scheduler open, close and boundary behavior with a fake clock unit tests

## Summary
Unit tests for due open, expired close and ignoring future and COMPLETED rounds

## Description
Tests in scheduler_test.go use fakeClock, fakeController and fakeLister only; no real time, I/O or network.

## How to verify
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `backend/internal/round/scheduler_test.go` · `TestTick_OpensDueRound` · L82-L99
- **Do:** Keep or add the test: round r1 SCHEDULED StartsAt 11:00 EndsAt 13:00, clock 12:00; assert Tick returns nil and ctrl.calls equals [{open w1 r1}] via reflect.DeepEqual
- **Run:** `cd backend && go test ./internal/round -run 'TestTick_OpensDueRound$'`
- **Expected:** Test passes

### Step 2 — `backend/internal/round/scheduler_test.go` · `TestTick_ClosesExpiredRound` · L101-L118
- **Do:** Keep or add the test: round r1 OPEN EndsAt 11:59, clock 12:00; assert nil error and ctrl.calls equals [{close w1 r1}]
- **Run:** `cd backend && go test ./internal/round -run 'TestTick_ClosesExpiredRound$'`
- **Expected:** Test passes

### Step 3 — `backend/internal/round/scheduler_test.go` · `TestTick_IgnoresFutureAndOtherStatuses` · L120-L158
- **Do:** Keep or add the test: future SCHEDULED (13:00), future OPEN (ends 13:00) and COMPLETED rounds; assert zero calls at 12:00, set clock.now to 13:00, assert calls equal open future-scheduled then close future-open
- **Run:** `cd backend && go test ./internal/round -run 'TestTick_IgnoresFutureAndOtherStatuses$'`
- **Expected:** Test passes

## Acceptance criteria
- TestTick_OpensDueRound asserts calls equal one open for w1/r1
- TestTick_ClosesExpiredRound asserts calls equal one close for w1/r1
- TestTick_IgnoresFutureAndOtherStatuses asserts no calls at 12:00 and open plus close at 13:00

## Definition of done
- The three tests pass
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-101.md`

## Links
- Evidence: EVD-020
- Requirement: REQ-050
- Unit (Act): UNIT-099
- Unit (Verify): UNIT-101
- Status: completed
- Change: UPDATE
