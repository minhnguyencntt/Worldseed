# UNIT-202 — Verify: Report edge case unit tests

## Summary
Unit tests for report duration, reporter errors and nil reporter

## Description
Use the existing fakeReporter from runner_report_test.go and an injected clock.

## How to verify
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `backend/worker/internal/runner/runner_report_edge_test.go` · `new: TestRunReportDurationFromClock` · new
- **Do:** newRunner with Config{AutoPublish:true}; set h.r.now to a func returning base.Add(n*time.Second) with n incremented per call; SetReporter(&fakeReporter{}); Run; assert reports[0].DurationMS > 0 and equals FinishedAt.Sub(StartedAt).Milliseconds().
- **Run:** `cd backend/worker && go test ./internal/runner -run TestRunReportDurationFromClock`
- **Expected:** Test passes

### Step 2 — `backend/worker/internal/runner/runner_report_edge_test.go` · `new: TestRunReporterErrorReturnedOnSuccess` · new
- **Do:** Reporter type returning errors.New("disk full") from Write; agent succeeds with AutoPublish true; assert errors.Is(err, thatErr).
- **Run:** `cd backend/worker && go test ./internal/runner -run TestRunReporterErrorReturnedOnSuccess`
- **Expected:** Test passes

### Step 3 — `backend/worker/internal/runner/runner_report_edge_test.go` · `new: TestRunReporterErrorDoesNotMaskRunError` · new
- **Do:** Same failing reporter; fakeAgent fails with boom and MaxRetries 0; assert errors.Is(err, boom) and the reporter error is not returned.
- **Run:** `cd backend/worker && go test ./internal/runner -run TestRunReporterErrorDoesNotMaskRunError`
- **Expected:** Test passes

### Step 4 — `backend/worker/internal/runner/runner_report_edge_test.go` · `new: TestRunNilReporter` · new
- **Do:** Do not call SetReporter; agent succeeds with AutoPublish true; assert err == nil.
- **Run:** `cd backend/worker && go test ./internal/runner -run TestRunNilReporter`
- **Expected:** Test passes without panic

## Acceptance criteria
- Duration derives from the injected clock
- Reporter error returned on success but not masking run errors
- Nil reporter does not panic

## Definition of done
- All four tests pass
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-202.md`

## Links
- Evidence: EVD-040
- Requirement: REQ-101
- Unit (Act): UNIT-198
- Unit (Verify): UNIT-202
- Status: completed
- Change: UPDATE
