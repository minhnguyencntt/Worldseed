# UNIT-257 — Verify: FileStore.FrozenIDs unit tests

## Summary
Temp-dir tests for snapshot reading

## Description
Test FrozenIDs with a temp dir.

## How to verify
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `backend/internal/contribution/frozen_test.go` · `new: TestFrozenIDs` · new
- **Do:** With t.TempDir() as Root, write worlds/w/rounds/round-0000001/snapshot.yaml listing ids CON-a and CON-b in the format of round.Snapshot; assert FrozenIDs returns [CON-a CON-b], true. Then for round-0000002 without the file assert nil,false,nil. Then call with worldID "../x" and assert a non-nil error.
- **Run:** `cd backend && go test ./internal/contribution -run TestFrozenIDs`
- **Expected:** Test passes

## Acceptance criteria
- Given a snapshot.yaml with ids, When FrozenIDs is called, Then ids are returned with frozen=true
- Given a missing snapshot or an unsafe world id, Then not-frozen without error and a non-nil error respectively

## Definition of done
- Tests pass
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-257.md`

## Links
- Evidence: EVD-050
- Requirement: REQ-128
- Unit (Act): UNIT-255
- Unit (Verify): UNIT-257
- Status: completed
- Change: UPDATE
