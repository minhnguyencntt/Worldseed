# UNIT-167 — Verify: JSON store and startup recovery unit tests

## Summary
Unit tests for state round-trip and recovery decisions with fake clock and liveness

## Description
Test from R2 with t.TempDir, fake Now and fake Alive.

## How to verify
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `worker/internal/state/state_test.go` · `new: TestStore_RoundTrip, TestStore_UnsafeID` · new
- **Do:** With Now fixed to 2026-01-01T00:00:00Z, Save Execution{ID:"EX-1",World:"w",Round:"ROUND-0000001",Status:RUNNING,Attempt:1,CostUSD:0.5}, Load and assert equality incl. UpdatedAt; Save with ID "../x" asserts error; List with an extra EX-1.report.json file returns one item
- **Run:** `cd worker && go test ./internal/state -run 'TestStore'`
- **Expected:** Tests pass

### Step 2 — `worker/internal/recovery/recovery_test.go` · `new: TestRun_ResumesBelowLimit, TestRun_MarksAtLimit, TestRun_StaleLockAndUntouched` · new
- **Do:** Seed store with RUNNING Attempt 0 and MaxRetries 2 -> expect QUEUED and Result.Action resumed; RUNNING Attempt 2 -> expect RECOVERING and Result.Action marked; AWAITING_APPROVAL and COMPLETED unchanged; write lock file content 'pid:999' with Alive returning false and assert the file is removed, and with Alive true assert it remains
- **Run:** `cd worker && go test ./internal/recovery -run 'TestRun'`
- **Expected:** All three tests pass

## Acceptance criteria
- Round trip and unsafe ID tests
- Resume, mark and untouched cases asserted
- Stale lock removal asserted

## Definition of done
- Tests pass in seconds
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-167.md`

## Links
- Evidence: EVD-035
- Requirement: REQ-082
- Unit (Act): UNIT-162
- Unit (Verify): UNIT-167
- Status: completed
- Change: UPDATE
