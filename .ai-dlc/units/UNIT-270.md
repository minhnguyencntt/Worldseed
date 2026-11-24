# UNIT-270 — Act: Confirm Exporter.Export frozen-only, empty and error behavior

## Summary
Confirm the tests' target exporter code needs no change

## Description
Exporter.Export in exporter.go already filters by frozen ids, returns a non-nil empty slice and wraps source errors. Read it and change nothing unless it disagrees with the acceptance criteria.

## How to act
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `backend/internal/contribution/exporter.go` · `Exporter.Export` · L25-L58
- **Do:** Read Export and confirm it calls FrozenIDs then ListByRound, wraps each error with fmt.Errorf %w, initializes out := []ExportContribution{} and maps ID, PlayerID to Author, Prompt to Content, CreatedAt
- **Run:** `cd backend && go build ./internal/contribution/`
- **Expected:** Behavior matches the requirement; no edit required

## Acceptance criteria
- Given Export is read, When compared to the requirement, Then it filters frozen ids in order, never returns nil Contributions and wraps errors with %w
- Given the package, When built, Then go build passes

## Definition of done
- Exporter confirmed to satisfy the requirement
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-270.md`

## Scan baseline
- Scan version: `v1`
- Scan tip: `9cda5131c65b08541fc685d8a0898d39a0e9e9fa`

## Links
- Evidence: EVD-054
- Requirement: REQ-135
- Unit (Act): UNIT-270
- Unit (Verify): UNIT-272
- Status: completed
- Change: UPDATE
