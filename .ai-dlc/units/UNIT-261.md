# UNIT-261 — Verify: ExportSource contract and import hygiene unit tests

## Summary
Unit tests for ExportSource satisfaction and no removed imports

## Description
Write export_source_test.go with a fake source and an import scan.

## How to verify
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `backend/internal/contribution/export_source_test.go` · `new: TestExportSource_Fake` · new
- **Do:** Define fakeSource returning two Contributions from ListByRound; assign to ExportSource; call ListByRound(ctx,"w","ROUND-0000001") and assert length 2.
- **Run:** `cd backend && go test ./internal/contribution -run TestExportSource_Fake`
- **Expected:** Test passes

### Step 2 — `backend/internal/contribution/export_source_test.go` · `new: TestExportFiles_NoRemovedImports` · new
- **Do:** Parse export.go and export_source.go with parser.ImportsOnly and assert no import path contains "worker" or "execution".
- **Run:** `cd backend && go test ./internal/contribution -run TestExportFiles_NoRemovedImports`
- **Expected:** Test passes

## Acceptance criteria
- Fake source works through ExportSource
- No export file imports worker or execution

## Definition of done
- Tests pass
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-261.md`

## Links
- Evidence: EVD-051
- Requirement: REQ-130
- Unit (Act): UNIT-259
- Unit (Verify): UNIT-261
- Status: completed
- Change: UPDATE
