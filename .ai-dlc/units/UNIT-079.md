# UNIT-079 — Verify: Scheduler behavior with a fake clock unit tests

## Summary
Fake clock and fake controller tests

## Description
Test Tick decisions only; no real timers.

## How to verify
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `backend/internal/round/scheduler_test.go` · `new: TestTick_OpensDueRound, TestTick_ClosesExpiredRound, TestTick_IgnoresFutureAndOtherStatuses` · new
- **Do:** Clock fixed at 2026-01-01T12:00Z. Rounds: SCHEDULED starts 11:00 -> expect Open call; OPEN ends 11:59 -> expect Close call; advance clock field to prove future SCHEDULED (starts 13:00) and OPEN (ends 13:00), COMPLETED rounds produce zero calls; controller error on Open is returned from Tick while Close still runs
- **Run:** `cd backend && go test ./internal/round -run TestTick`
- **Expected:** TestTick tests pass (go test reports PASS)

## Acceptance criteria
- Open called once for due SCHEDULED round
- Close called once for expired OPEN round
- No calls for future rounds or other statuses

## Definition of done
- Tests pass
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-079.md`

## Links
- Evidence: EVD-015
- Requirement: REQ-038
- Unit (Act): UNIT-073
- Unit (Verify): UNIT-079
- Status: completed
- Change: UPDATE
