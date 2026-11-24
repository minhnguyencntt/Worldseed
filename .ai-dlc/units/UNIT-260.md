# UNIT-260 — Verify: Export JSON shape and docs unit tests

## Summary
Unit tests for Export JSON keys and doc comments

## Description
Write export_test.go asserting marshalled keys, RFC3339 time and doc comments on the types.

## How to verify
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `backend/internal/contribution/export_test.go` · `new: TestExport_JSONShape` · new
- **Do:** Marshal Export{Version: ExportVersion, WorldID: "w", RoundID: "ROUND-0000001", Contributions: one ExportContribution with ID CON-1, Author p1, Content hi, CreatedAt 2026-01-02T03:04:05Z}; unmarshal into map[string]any and assert keys version, world_id, round_id, contributions and the four contribution keys, and created_at equals "2026-01-02T03:04:05Z".
- **Run:** `cd backend && go test ./internal/contribution -run TestExport_JSONShape`
- **Expected:** Test passes

### Step 2 — `backend/internal/contribution/export_test.go` · `new: TestExport_TypesDocumented` · new
- **Do:** Use go/parser with parser.ParseComments on export.go and assert the GenDecls for Export and ExportContribution have non-empty Doc.
- **Run:** `cd backend && go test ./internal/contribution -run TestExport_TypesDocumented`
- **Expected:** Test passes

## Acceptance criteria
- Marshalled Export has version, world_id, round_id, contributions
- Each contribution has id, author, content, created_at

## Definition of done
- Tests pass
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-260.md`

## Links
- Evidence: EVD-051
- Requirement: REQ-129
- Unit (Act): UNIT-258
- Unit (Verify): UNIT-260
- Status: completed
- Change: UPDATE
