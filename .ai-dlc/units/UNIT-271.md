# UNIT-271 — Act: Confirm FileStore.FrozenIDs reads snapshot ids and rejects unsafe segments

## Summary
Confirm FrozenIDs needs no change

## Description
FileStore.FrozenIDs in store.go reads snapshot.yaml. Read it and confirm it returns ordered ids, ErrNotFound when missing and an error for unsafe segments.

## How to act
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `backend/internal/contribution/store.go` · `FileStore.FrozenIDs` · L170-L200
- **Do:** Read FrozenIDs and confirm it validates world and round segments, reads snapshot.yaml, maps a missing file to ErrNotFound and returns the contribution ids in file order
- **Run:** `cd backend && go build ./internal/contribution/`
- **Expected:** Behavior matches the requirement; no edit required

## Acceptance criteria
- Given FrozenIDs is read, When compared to the requirement, Then it returns ids in order, ErrNotFound for a missing file and non-ErrNotFound errors for unsafe ids
- Given the package, When built, Then go build passes

## Definition of done
- FrozenIDs confirmed to satisfy the requirement
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-271.md`

## Scan baseline
- Scan version: `v1`
- Scan tip: `9cda5131c65b08541fc685d8a0898d39a0e9e9fa`

## Links
- Evidence: EVD-054
- Requirement: REQ-136
- Unit (Act): UNIT-271
- Unit (Verify): UNIT-273
- Status: completed
- Change: UPDATE
