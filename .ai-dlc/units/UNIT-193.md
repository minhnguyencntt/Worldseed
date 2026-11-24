# UNIT-193 — Verify: report writer unit tests

## Summary
Unit tests for report.Writer

## Description
Prove the writer persists reports and rejects bad ids using a temp dir.

## How to verify
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `backend/worker/internal/report/report_test.go` · `new: TestWriteRoundTrip` · new
- **Do:** With dir=t.TempDir()/executions, Write Report{ExecutionID:"exec-1",RoundID:"ROUND-0000001",Status:store.StatusFailed,Attempts:2,Error:"boom"}; read exec-1.json, json.Unmarshal, assert all fields equal
- **Run:** `cd backend/worker && go test ./internal/report -run TestWriteRoundTrip`
- **Expected:** Test passes

### Step 2 — `backend/worker/internal/report/report_test.go` · `new: TestWriteInvalidID` · new
- **Do:** Write Report with ExecutionID "../evil"; assert errors.Is(err, store.ErrInvalidID) and os.ReadDir of the dir and its parent show no new json file
- **Run:** `cd backend/worker && go test ./internal/report -run TestWriteInvalidID`
- **Expected:** Test passes

## Acceptance criteria
- Round-trip equals input
- Invalid id rejected with no files

## Definition of done
- Tests pass
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-193.md`

## Links
- Evidence: EVD-039
- Requirement: REQ-096
- Unit (Act): UNIT-190
- Unit (Verify): UNIT-193
- Status: completed
- Change: UPDATE
