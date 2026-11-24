# UNIT-254 — Act: Add Exporter, Export format and ErrNotFrozen

## Summary
Create export.go with the documented export

## Description
New file export.go implementing the Exporter over ExportSource.

## How to act
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `backend/internal/contribution/export.go` · `new: package doc, ExportSource, Export, ExportEntry, ErrNotFrozen` · new
- **Do:** Create the file with a package-level doc comment describing the JSON format and that only snapshot-frozen contributions are exported; declare ExportSource interface, Export and ExportEntry structs with the json tags and ErrNotFrozen.

```
type ExportSource interface {
	ListByRound(ctx context.Context, worldID, roundID string) ([]Contribution, error)
	FrozenIDs(ctx context.Context, worldID, roundID string) ([]string, bool, error)
}
type ExportEntry struct {
	ID string `json:"id"`
	Author string `json:"author"`
	Content string `json:"content"`
	CreatedAt time.Time `json:"created_at"`
}
type Export struct {
	Version int `json:"version"`
	World string `json:"world"`
	Round string `json:"round"`
	Contributions []ExportEntry `json:"contributions"`
}
var ErrNotFrozen = errors.New("contribution: round is not frozen")
```

- **Expected:** Types compile

### Step 2 — `backend/internal/contribution/export.go` · `new: Exporter.Export` · new
- **Do:** Add type Exporter{Source ExportSource} and method Export(ctx, worldID, roundID) (Export, error): call FrozenIDs (return ErrNotFrozen if frozen=false), call ListByRound, keep only contributions whose ID is in the frozen set, convert to ExportEntry with CreatedAt.UTC(), initialise Contributions to an empty non-nil slice, set Version 1.

```
func (e Exporter) Export(ctx context.Context, worldID, roundID string) (Export, error)
```

- **Expected:** Returns Export with Contributions [] when none are frozen

## Acceptance criteria
- Export returns only frozen contributions in stable order
- Not-frozen round returns ErrNotFrozen

## Definition of done
- go build ./internal/contribution succeeds
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-254.md`

## Scan baseline
- Scan version: `v1`
- Scan tip: `9cda5131c65b08541fc685d8a0898d39a0e9e9fa`

## Links
- Evidence: EVD-050
- Requirement: REQ-127
- Unit (Act): UNIT-254
- Unit (Verify): UNIT-256
- Status: completed
- Change: UPDATE
