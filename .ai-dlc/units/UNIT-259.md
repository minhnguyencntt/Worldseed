# UNIT-259 — Act: Add the ExportSource interface

## Summary
Create export_source.go with ExportSource interface and FileStore assertion

## Description
Declare ExportSource with ListByRound matching FileStore, plus a compile-time assertion.

## How to act
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `backend/internal/contribution/export_source.go` · `new: ExportSource` · new
- **Do:** Create the file importing context; declare interface ExportSource with ListByRound(ctx context.Context, worldID, roundID string) ([]Contribution, error) with a doc comment, and add var _ ExportSource = (*FileStore)(nil). FileStore.ListByRound is at store.go L138.

```
var _ ExportSource = (*FileStore)(nil)
```

- **Expected:** go build ./internal/contribution succeeds

## Acceptance criteria
- ExportSource is exported and documented
- FileStore satisfies it at compile time

## Definition of done
- go build ./internal/contribution passes
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-259.md`

## Scan baseline
- Scan version: `v1`
- Scan tip: `9cda5131c65b08541fc685d8a0898d39a0e9e9fa`

## Links
- Evidence: EVD-051
- Requirement: REQ-130
- Unit (Act): UNIT-259
- Unit (Verify): UNIT-261
- Status: completed
- Change: UPDATE
