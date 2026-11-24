# UNIT-258 — Act: Add Export and ExportContribution JSON types

## Summary
Create export.go with documented JSON types

## Description
Create backend/internal/contribution/export.go declaring ExportVersion, Export and ExportContribution with json tags and doc comments.

## How to act
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `backend/internal/contribution/export.go` · `new: Export, ExportContribution, ExportVersion` · new
- **Do:** Create the file with package contribution, importing time; declare const ExportVersion = 1, type ExportContribution with ID, Author, Content string and CreatedAt time.Time, and type Export with Version int, WorldID, RoundID string, Contributions []ExportContribution; document the format in package-level and type doc comments.

```
type ExportContribution struct {
	ID string `json:"id"`
	Author string `json:"author"`
	Content string `json:"content"`
	CreatedAt time.Time `json:"created_at"`
}
type Export struct {
	Version int `json:"version"`
	WorldID string `json:"world_id"`
	RoundID string `json:"round_id"`
	Contributions []ExportContribution `json:"contributions"`
}
```

- **Expected:** go build ./internal/contribution succeeds

## Acceptance criteria
- export.go compiles in package contribution
- Types carry snake_case json tags and doc comments

## Definition of done
- go build ./internal/contribution passes
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-258.md`

## Scan baseline
- Scan version: `v1`
- Scan tip: `9cda5131c65b08541fc685d8a0898d39a0e9e9fa`

## Links
- Evidence: EVD-051
- Requirement: REQ-129
- Unit (Act): UNIT-258
- Unit (Verify): UNIT-260
- Status: completed
- Change: UPDATE
