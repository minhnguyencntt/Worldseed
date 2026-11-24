# UNIT-268 — Verify: Exporter frozen-only filtering unit tests

## Summary
Unit tests for frozen-only export

## Description
Tests with the in-memory fakeSource from export_source_test.go.

## How to verify
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `backend/internal/contribution/exporter_test.go` · `new: TestExporter_OnlyFrozen` · new
- **Do:** Build fakeSource with contributions A,B,C (PlayerID p1, Prompt text, fixed CreatedAt) and frozen [C,A]; call NewExporter(src).Export(ctx,"w","ROUND-0000001"); assert Contributions IDs equal [C,A], B absent, Author==PlayerID, Content==Prompt, Version==ExportVersion, WorldID and RoundID set
- **Run:** `cd backend && go test ./internal/contribution -run TestExporter_OnlyFrozen`
- **Expected:** Test passes

## Acceptance criteria
- Only frozen ids appear in snapshot order
- Fields map correctly

## Definition of done
- Tests pass
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-268.md`

## Links
- Evidence: EVD-053
- Requirement: REQ-133
- Unit (Act): UNIT-266
- Unit (Verify): UNIT-268
- Status: completed
- Change: UPDATE
