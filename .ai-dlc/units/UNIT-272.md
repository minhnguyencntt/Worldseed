# UNIT-272 — Verify: Exporter format, frozen-only, empty round and error tests

## Summary
Exporter unit tests exist and pass with fake sources

## Description
Confirm TestExporter_OnlyFrozen, TestExporter_EmptyRound, TestExporter_SourceErrors and TestExport_JSONShape exist and assert the acceptance criteria using fakeSource and errSource; add any missing assertion.

## How to verify
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `backend/internal/contribution/exporter_test.go` · `TestExporter_OnlyFrozen` · L22-L76
- **Do:** Confirm it uses fakeSource with contributions A,B,C and frozen C,A and asserts IDs [C A], Author, Content, CreatedAt, Version, WorldID, RoundID
- **Run:** `cd backend && go test ./internal/contribution/ -run 'TestExporter_OnlyFrozen'`
- **Expected:** Test passes

### Step 2 — `backend/internal/contribution/exporter_test.go` · `TestExporter_EmptyRound and TestExporter_SourceErrors` · L78-L148
- **Do:** Confirm the empty round asserts non-nil empty Contributions and JSON containing "contributions":[], and that errSource errors satisfy errors.Is
- **Run:** `cd backend && go test ./internal/contribution/ -run 'TestExporter_EmptyRound|TestExporter_SourceErrors'`
- **Expected:** Both tests pass

### Step 3 — `backend/internal/contribution/export_test.go` · `TestExport_JSONShape` · L16-L91
- **Do:** Confirm it marshals an Export and asserts the documented JSON keys
- **Run:** `cd backend && go test ./internal/contribution/ -run 'TestExport_JSONShape'`
- **Expected:** Test passes

## Acceptance criteria
- Given the exporter tests, When run, Then all pass
- Given the tests, When read, Then each REQ1 acceptance criterion maps to an assertion

## Definition of done
- Exporter tests pass
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-272.md`

## Links
- Evidence: EVD-054
- Requirement: REQ-135
- Unit (Act): UNIT-270
- Unit (Verify): UNIT-272
- Status: completed
- Change: UPDATE
