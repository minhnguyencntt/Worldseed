# UNIT-219 — Verify: Poll detection of SCHEDULED and CLOSED Rounds unit tests

## Summary
Unit tests with fake Git and fake clock for detection

## Description
Write backend/worker/internal/poller/poller_detect_test.go with fakeGit (records call order, returns configured Rounds/errors), fakeCloser (records calls) and fakeClock types shared by the other poller tests.

## How to verify
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `backend/worker/internal/poller/poller_detect_test.go` · `new: fakeGit, fakeCloser, fakeClock` · new
- **Do:** Define fakeGit{rounds []Round; pullErr, listErr error; calls []string} whose Pull appends "pull" and ListRounds appends "list"; fakeCloser{calls []string; errFor map[string]error} whose Close appends the round ID; fakeClock{now time.Time}.
- **Run:** `cd backend/worker && go test ./internal/poller -run TestPollDetectsScheduledAndClosed`
- **Expected:** Helpers compile for all poller tests.

### Step 2 — `backend/worker/internal/poller/poller_detect_test.go` · `TestPollDetectsScheduledAndClosed` · new
- **Do:** Inputs: Rounds R1 SCHEDULED, R2 OPEN with EndsAt one hour after the fake clock, R3 CLOSED. Assert Result.Scheduled equals []string{"R1"}, Result.Closed equals []string{"R3"}, Result.ClosedNow is empty, err is nil, fakeCloser.calls is empty and fakeGit.calls equals []string{"pull","list"}.
- **Run:** `cd backend/worker && go test ./internal/poller -run TestPollDetectsScheduledAndClosed`
- **Expected:** Test passes.

### Step 3 — `backend/worker/internal/poller/poller_detect_test.go` · `TestPollNoRounds` · new
- **Do:** Input: fakeGit with no Rounds. Assert err is nil and all three Result slices have length 0.
- **Run:** `cd backend/worker && go test ./internal/poller -run TestPollNoRounds`
- **Expected:** Test passes.

## Acceptance criteria
- Scheduled and Closed IDs are returned as specified.
- Empty list yields empty slices.
- Pull is called before ListRounds once each.

## Definition of done
- Tests pass
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-219.md`

## Links
- Evidence: EVD-043
- Requirement: REQ-108
- Unit (Act): UNIT-216
- Unit (Verify): UNIT-219
- Status: completed
- Change: UPDATE
