# UNIT-089 — Verify: Tick opens due and closes expired rounds unit tests

## Summary
Unit tests for Open and Close dispatch with fake clock and controller

## Description
Tests use fakeClock, fakeController and fakeLister from scheduler_test.go so no real time, filesystem or controller is involved.

## How to verify
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `backend/internal/round/scheduler_test.go` · `TestTick_OpensDueRound` · L68-L83
- **Do:** Run the test with a SCHEDULED round with StartsAt 11:00 and clock 12:00 in world w1 and assert ctrl.calls equals [{open w1 r1}]. Keep it as is if it passes.
- **Run:** `cd backend && go test -count=1 -run 'TestTick_OpensDueRound$' ./internal/round/`
- **Expected:** Test passes with ok.

### Step 2 — `backend/internal/round/scheduler_test.go` · `TestTick_ClosesExpiredRound` · L86-L101
- **Do:** Run the test with an OPEN round with EndsAt 11:59 and clock 12:00 and assert ctrl.calls equals [{close w1 r1}]. Keep it as is if it passes.
- **Run:** `cd backend && go test -count=1 -run 'TestTick_ClosesExpiredRound$' ./internal/round/`
- **Expected:** Test passes with ok.

## Acceptance criteria
- TestTick_OpensDueRound asserts exactly one open call for the due SCHEDULED round.
- TestTick_ClosesExpiredRound asserts exactly one close call for the expired OPEN round.

## Definition of done
- Both tests pass with -count=1
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-089.md`

## Links
- Evidence: EVD-017
- Requirement: REQ-044
- Unit (Act): UNIT-087
- Unit (Verify): UNIT-089
- Status: completed
- Change: UPDATE
