# UNIT-194 — Verify: Runner report unit tests

## Summary
Unit tests for Runner reporting

## Description
Use a fake Reporter to prove reports for each outcome and none on lock contention.

## How to verify
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `backend/worker/internal/runner/runner_report_test.go` · `new: fakeReporter, TestRunReportsFailure` · new
- **Do:** Define fakeReporter collecting []report.Report. Build newRunner with Config{MaxRetries:0}, fakeAgent{errs:[]error{errors.New("boom")}}, call SetReporter, Run("exec-1","ROUND-0000001"); assert one report with Status FAILED, Error containing boom, ExecutionID exec-1
- **Run:** `cd backend/worker && go test ./internal/runner -run TestRunReportsFailure`
- **Expected:** Test passes

### Step 2 — `backend/worker/internal/runner/runner_report_test.go` · `new: TestRunReportsApprovalAndCompleted` · new
- **Do:** Run once with AutoPublish false and assert report Status AWAITING_APPROVAL; run again with AutoPublish true and assert COMPLETED; assert StartedAt equals fixedNow
- **Run:** `cd backend/worker && go test ./internal/runner -run TestRunReportsApprovalAndCompleted`
- **Expected:** Test passes

### Step 3 — `backend/worker/internal/runner/runner_report_test.go` · `new: TestRunLockedWritesNoReport` · new
- **Do:** Create the lock file at rig.cfg.LockPath via lock.Acquire, call Run, assert errors.Is(err, lock.ErrLocked) and fakeReporter has zero reports
- **Run:** `cd backend/worker && go test ./internal/runner -run TestRunLockedWritesNoReport`
- **Expected:** Test passes

## Acceptance criteria
- FAILED, AWAITING_APPROVAL, COMPLETED reports captured
- No report when locked

## Definition of done
- Tests pass
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-194.md`

## Links
- Evidence: EVD-039
- Requirement: REQ-097
- Unit (Act): UNIT-191
- Unit (Verify): UNIT-194
- Status: completed
- Change: UPDATE
