# UNIT-256 — Verify: Exporter format, empty round and frozen-only unit tests

## Summary
Unit tests with a fake ExportSource

## Description
Test Exporter with a fake source, no filesystem.

## How to verify
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `backend/internal/contribution/export_test.go` · `new: fakeSource, TestExport_Format` · new
- **Do:** Define fakeSource implementing ExportSource with in-memory contributions and frozen ids. TestExport_Format: 2 frozen contributions with fixed CreatedAt; json.Marshal the result and assert it equals an expected literal containing version 1, world, round and each entry's id, author, content, created_at.
- **Run:** `cd backend && go test ./internal/contribution -run TestExport_Format`
- **Expected:** Test passes

### Step 2 — `backend/internal/contribution/export_test.go` · `new: TestExport_EmptyRound, TestExport_OnlyFrozen, TestExport_NotFrozen` · new
- **Do:** EmptyRound: frozen=true with no ids; assert marshalled JSON contains "contributions":[]. OnlyFrozen: 3 listed, 2 frozen ids; assert exactly those 2 returned in created_at order. NotFrozen: frozen=false; assert errors.Is(err, ErrNotFrozen).
- **Run:** `cd backend && go test ./internal/contribution -run 'TestExport_(EmptyRound|OnlyFrozen|NotFrozen)'`
- **Expected:** All pass

## Acceptance criteria
- Given 2 frozen contributions, When exported and marshalled, Then JSON matches the expected literal with version, world, round and entries
- Given empty, frozen-only and not-frozen inputs, Then three tests pass asserting [] , exactly 2 of 3 entries, and ErrNotFrozen

## Definition of done
- Tests pass
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-256.md`

## Links
- Evidence: EVD-050
- Requirement: REQ-127
- Unit (Act): UNIT-254
- Unit (Verify): UNIT-256
- Status: completed
- Change: UPDATE
