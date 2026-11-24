# UNIT-213 — Verify: Recover scan and resume unit tests with fake store

## Summary
Unit tests for which statuses are resumed and for list errors.

## Description
Tests in recovery_test.go with in-memory fakes only.

## How to verify
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `backend/worker/internal/recovery/recovery_test.go` · `new: fakeStore, fakeResumer, TestRecoverResumesOnlyUnfinished` · new
- **Do:** Define fakeStore (slice of store.Execution, saved slice, listErr) and fakeResumer (records IDs, errFor map). TestRecoverResumesOnlyUnfinished: seed executions a-pending(PENDING), b-running(RUNNING), c-recovering(RECOVERING), d-done(COMPLETED), e-failed(FAILED), f-await(AWAITING_APPROVAL); call New(Config{}, fs, fr, nil, clock).Recover; assert resumer IDs equal [a-pending b-running c-recovering], Result.Resumed equals the same, and fs.saved is empty.
- **Run:** `cd backend/worker && go test ./internal/recovery -run TestRecoverResumesOnlyUnfinished`
- **Expected:** Test passes.

### Step 2 — `backend/worker/internal/recovery/recovery_test.go` · `new: TestRecoverListError` · new
- **Do:** Set fakeStore.listErr to errors.New("disk"); call Recover; assert errors.Is(err, listErr) and resumer recorded no IDs.
- **Run:** `cd backend/worker && go test ./internal/recovery -run TestRecoverListError`
- **Expected:** Test passes.

## Acceptance criteria
- Only unfinished statuses are resumed
- List error is returned wrapped

## Definition of done
- Tests pass
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-213.md`

## Links
- Evidence: EVD-042
- Requirement: REQ-105
- Unit (Act): UNIT-210
- Unit (Verify): UNIT-213
- Status: completed
- Change: UPDATE
