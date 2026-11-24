# UNIT-102 — Verify: Tick open failure is returned and Close still runs unit tests

## Summary
Unit test for Open error propagation while another round is still closed

## Description
A fakeController with openErr set is used with a due SCHEDULED round and an expired OPEN round in one world.

## How to verify
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `backend/internal/round/scheduler_test.go` · `TestTick_OpenErrorIsReturnedAndCloseStillRuns` · L160-L187
- **Do:** Keep or add the test: ctrl := &fakeController{openErr: errors.New("boom")}; world w1 has due-scheduled (SCHEDULED, StartsAt 11:00) and expired-open (OPEN, EndsAt 11:59); assert errors.Is(err, openErr) and ctrl.calls equals open due-scheduled then close expired-open
- **Run:** `cd backend && go test ./internal/round -run 'TestTick_OpenErrorIsReturnedAndCloseStillRuns$'`
- **Expected:** Test passes

## Acceptance criteria
- Tick error satisfies errors.Is(err, openErr)
- Calls are open due-scheduled then close expired-open

## Definition of done
- The test passes
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-102.md`

## Links
- Evidence: EVD-020
- Requirement: REQ-051
- Unit (Act): UNIT-100
- Unit (Verify): UNIT-102
- Status: completed
- Change: UPDATE
