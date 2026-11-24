# UNIT-269 — Verify: Exporter empty round and error propagation unit tests

## Summary
Unit tests for empty round and errors

## Description
Tests for empty list JSON and ErrNotFound propagation using fakes.

## How to verify
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `backend/internal/contribution/exporter_test.go` · `new: TestExporter_EmptyRound` · new
- **Do:** With fakeSource holding contributions but frozen nil, call Export, assert Contributions is non-nil with len 0 and json.Marshal output contains "contributions":[]
- **Run:** `cd backend && go test ./internal/contribution -run TestExporter_EmptyRound`
- **Expected:** Test passes

### Step 2 — `backend/internal/contribution/exporter_test.go` · `new: TestExporter_SourceErrors` · new
- **Do:** Define errSource implementing ExportSource whose FrozenIDs returns ErrNotFound; assert errors.Is(err, ErrNotFound); second case with ListByRound returning a custom error asserts errors.Is on it
- **Run:** `cd backend && go test ./internal/contribution -run TestExporter_SourceErrors`
- **Expected:** Test passes

## Acceptance criteria
- Empty round marshals contributions as []
- ErrNotFound propagates via errors.Is

## Definition of done
- Tests pass
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-269.md`

## Links
- Evidence: EVD-053
- Requirement: REQ-134
- Unit (Act): UNIT-267
- Unit (Verify): UNIT-269
- Status: completed
- Change: UPDATE
