# UNIT-220 — Verify: Expired Round closing unit tests with fake clock and Closer

## Summary
Unit tests for the expiry close path

## Description
Write backend/worker/internal/poller/poller_close_test.go reusing the fakes from poller_detect_test.go.

## How to verify
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `backend/worker/internal/poller/poller_close_test.go` · `TestPollClosesExpiredOpenRound` · new
- **Do:** Inputs: fake clock at 12:00 UTC; Rounds E1 OPEN EndsAt 11:00, E2 OPEN EndsAt exactly 12:00, F1 OPEN EndsAt 13:00. Assert fakeCloser.calls equals []string{"E1","E2"}, Result.ClosedNow equals []string{"E1","E2"}, Result.Closed equals []string{"E1","E2"}, err nil.
- **Run:** `cd backend/worker && go test ./internal/poller -run TestPollClosesExpiredOpenRound`
- **Expected:** Test passes.

### Step 2 — `backend/worker/internal/poller/poller_close_test.go` · `TestPollClosedAndNewlyClosedCombined` · new
- **Do:** Inputs: Round C1 CLOSED and Round E1 expired OPEN. Assert Result.Closed equals []string{"C1","E1"} and ClosedNow equals []string{"E1"}.
- **Run:** `cd backend/worker && go test ./internal/poller -run TestPollClosedAndNewlyClosedCombined`
- **Expected:** Test passes.

## Acceptance criteria
- Expired OPEN Round is closed once; boundary EndsAt==now closes; future EndsAt does not.
- Closed ID appears in ClosedNow and Closed.

## Definition of done
- Tests pass
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-220.md`

## Links
- Evidence: EVD-043
- Requirement: REQ-109
- Unit (Act): UNIT-217
- Unit (Verify): UNIT-220
- Status: completed
- Change: UPDATE
