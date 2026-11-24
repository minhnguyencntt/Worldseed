# UNIT-273 — Verify: FileStore.FrozenIDs temp-dir unit tests

## Summary
FrozenIDs unit tests exist and pass

## Description
Confirm TestFileStore_FrozenIDs covers ordered ids, missing snapshot and unsafe ids using t.TempDir and fakeCommitter.

## How to verify
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `backend/internal/contribution/store_test.go` · `TestFileStore_FrozenIDs` · L329-L400
- **Do:** Confirm subtests: snapshot lists IDs in order ([a b]), missing snapshot returns ErrNotFound, and unsafe cases (../x world, a/b round) return a non-nil non-ErrNotFound error
- **Run:** `cd backend && go test ./internal/contribution/ -run 'TestFileStore_FrozenIDs'`
- **Expected:** All subtests pass

## Acceptance criteria
- Given TestFileStore_FrozenIDs, When run, Then all subtests pass
- Given the subtests, When read, Then each REQ2 criterion maps to a subtest

## Definition of done
- FrozenIDs tests pass
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-273.md`

## Links
- Evidence: EVD-054
- Requirement: REQ-136
- Unit (Act): UNIT-271
- Unit (Verify): UNIT-273
- Status: completed
- Change: UPDATE
