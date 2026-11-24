# UNIT-221 — Verify: Poll error handling unit tests

## Summary
Unit tests for pull, list, close failures and nil Closer

## Description
Write backend/worker/internal/poller/poller_errors_test.go reusing the fakes from poller_detect_test.go.

## How to verify
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `backend/worker/internal/poller/poller_errors_test.go` · `TestPollPullFailureAborts` · new
- **Do:** Input: fakeGit.pullErr = errBoom. Assert errors.Is(err, errBoom), fakeGit.calls equals []string{"pull"}, fakeCloser.calls empty and Result slices empty. Add a second case with listErr = errBoom asserting errors.Is(err, errBoom) and fakeCloser.calls empty.
- **Run:** `cd backend/worker && go test ./internal/poller -run TestPollPullFailureAborts`
- **Expected:** Test passes.

### Step 2 — `backend/worker/internal/poller/poller_errors_test.go` · `TestPollCloseFailureContinues` · new
- **Do:** Inputs: expired OPEN E1 and E2, fakeCloser.errFor["E1"] = errBoom. Assert errors.Is(err, errBoom), fakeCloser.calls equals []string{"E1","E2"}, Result.Closed equals []string{"E2"} and ClosedNow equals []string{"E2"}.
- **Run:** `cd backend/worker && go test ./internal/poller -run TestPollCloseFailureContinues`
- **Expected:** Test passes.

### Step 3 — `backend/worker/internal/poller/poller_errors_test.go` · `TestPollNilCloser` · new
- **Do:** Input: New with a nil Closer and one expired OPEN Round. Assert err is non-nil, its message contains "no closer configured" and no panic occurs.
- **Run:** `cd backend/worker && go test ./internal/poller -run TestPollNilCloser`
- **Expected:** Test passes.

## Acceptance criteria
- Pull and list failures abort with wrapped errors.
- Close failure does not stop other Rounds.
- Nil Closer returns an error without panic.

## Definition of done
- Tests pass
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-221.md`

## Links
- Evidence: EVD-043
- Requirement: REQ-110
- Unit (Act): UNIT-218
- Unit (Verify): UNIT-221
- Status: completed
- Change: UPDATE
