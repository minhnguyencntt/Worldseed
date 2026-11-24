# UNIT-263 — Act: Add FrozenIDs to the ExportSource interface

## Summary
Declare FrozenIDs in ExportSource, keep FileStore assertion

## Description
Extend the interface in export_source.go; the existing assertion then enforces FileStore implements it.

## How to act
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `backend/internal/contribution/export_source.go` · `ExportSource` · L5-L12
- **Do:** Add method FrozenIDs(ctx context.Context, worldID, roundID string) ([]string, error) with a doc comment saying it returns the ids frozen in the round's snapshot.yaml or ErrNotFound; leave 'var _ ExportSource = (*FileStore)(nil)' unchanged.

```
FrozenIDs(ctx context.Context, worldID, roundID string) ([]string, error)
```

- **Expected:** go build ./internal/contribution succeeds (non-test code only; the test fake is updated in Verify)

## Acceptance criteria
- ExportSource declares FrozenIDs
- Assertion on *FileStore retained

## Definition of done
- Interface extended and package builds
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-263.md`

## Scan baseline
- Scan version: `v1`
- Scan tip: `9cda5131c65b08541fc685d8a0898d39a0e9e9fa`

## Links
- Evidence: EVD-052
- Requirement: REQ-132
- Unit (Act): UNIT-263
- Unit (Verify): UNIT-265
- Status: completed
- Change: UPDATE
