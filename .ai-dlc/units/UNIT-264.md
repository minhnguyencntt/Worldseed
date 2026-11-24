# UNIT-264 — Verify: FileStore.FrozenIDs unit tests

## Summary
Unit tests for FrozenIDs success, not-found and invalid ids

## Description
Test FrozenIDs against a t.TempDir() root with hand-written snapshot.yaml files.

## How to verify
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `backend/internal/contribution/store_test.go` · `new: TestFileStore_FrozenIDs` · after L277
- **Do:** Add table-style subtests: (1) write worlds/w/rounds/round-0000001/snapshot.yaml matching the round.Snapshot layout in backend/internal/round/snapshot.go with contribution ids 'a','b' and assert FrozenIDs(ctx,'w','ROUND-0000001') equals []string{'a','b'}; (2) no snapshot file, assert errors.Is(err, ErrNotFound); (3) worldID '../x' and roundID 'a/b' each return non-nil error and not ErrNotFound.
- **Run:** `cd backend && go test ./internal/contribution -run TestFileStore_FrozenIDs`
- **Expected:** All subtests pass

## Acceptance criteria
- Returns ids in order
- Missing snapshot gives ErrNotFound
- Unsafe ids are rejected

## Definition of done
- Tests pass
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-264.md`

## Links
- Evidence: EVD-052
- Requirement: REQ-131
- Unit (Act): UNIT-262
- Unit (Verify): UNIT-264
- Status: completed
- Change: NEW
