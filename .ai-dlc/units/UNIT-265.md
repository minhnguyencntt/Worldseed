# UNIT-265 — Verify: ExportSource includes FrozenIDs and FileStore satisfies it

## Summary
Update fake source and assert FileStore implements ExportSource

## Description
Update the test fake to implement the extended interface and add an explicit assertion test.

## How to verify
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `backend/internal/contribution/export_source_test.go` · `fakeSource` · L10-L19
- **Do:** Add field frozen []string and method FrozenIDs(_ context.Context, _, _ string) ([]string, error) returning it, so fakeSource still satisfies ExportSource.
- **Run:** `cd backend && go test ./internal/contribution -run 'TestExportSource_Fake|TestFileStore_ImplementsExportSource|TestExportFiles_NoRemovedImports'`
- **Expected:** Package tests compile

### Step 2 — `backend/internal/contribution/export_source_test.go` · `new: TestFileStore_ImplementsExportSource` · after L47
- **Do:** Create a FileStore{Root: t.TempDir()}, assign to a variable of type ExportSource, call FrozenIDs for world 'w' round 'ROUND-0000001' and assert errors.Is(err, ErrNotFound).
- **Run:** `cd backend && go test ./internal/contribution -run 'TestExportSource_Fake|TestFileStore_ImplementsExportSource|TestExportFiles_NoRemovedImports'`
- **Expected:** All three tests pass

## Acceptance criteria
- Fake implements ExportSource with FrozenIDs
- FileStore assigned to ExportSource compiles and works

## Definition of done
- Tests pass
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-265.md`

## Links
- Evidence: EVD-052
- Requirement: REQ-132
- Unit (Act): UNIT-263
- Unit (Verify): UNIT-265
- Status: completed
- Change: UPDATE
