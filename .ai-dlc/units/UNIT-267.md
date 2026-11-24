# UNIT-267 — Act: Wrap source errors and guarantee a non-nil empty list in Exporter.Export

## Summary
Add error wrapping and empty-list guarantee

## Description
In Exporter.Export, return wrapped errors from the source and make sure Contributions is never nil.

## How to act
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `backend/internal/contribution/exporter.go` · `(*Exporter).Export` · after the Export signature
- **Do:** Check err from FrozenIDs first and return Export{}, fmt.Errorf("contribution: export frozen ids: %w", err); then check err from ListByRound and return fmt.Errorf("contribution: export list: %w", err); add the fmt import. Keep out initialised as []ExportContribution{} so it is non-nil

```
ids, err := e.Source.FrozenIDs(ctx, worldID, roundID)
if err != nil { return Export{}, fmt.Errorf("contribution: export frozen ids: %w", err) }
```

- **Expected:** Errors wrapped; empty set returns []

## Acceptance criteria
- Source errors are wrapped with %w
- Empty frozen set yields a non-nil empty slice

## Definition of done
- Error and empty paths implemented
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-267.md`

## Scan baseline
- Scan version: `v1`
- Scan tip: `9cda5131c65b08541fc685d8a0898d39a0e9e9fa`

## Links
- Evidence: EVD-053
- Requirement: REQ-134
- Unit (Act): UNIT-267
- Unit (Verify): UNIT-269
- Status: completed
- Change: UPDATE
