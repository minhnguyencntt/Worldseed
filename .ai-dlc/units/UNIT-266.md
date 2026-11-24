# UNIT-266 — Act: Add Exporter with frozen-only filtering

## Summary
Create exporter.go with Exporter and Export method

## Description
Create backend/internal/contribution/exporter.go defining Exporter wrapping an ExportSource and building an Export from frozen contributions.

## How to act
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `backend/internal/contribution/exporter.go` · `new: Exporter, NewExporter` · new
- **Do:** Create package contribution file with type Exporter struct{ Source ExportSource } and func NewExporter(src ExportSource) *Exporter, each with a doc comment

```
type Exporter struct{ Source ExportSource }
func NewExporter(src ExportSource) *Exporter { return &Exporter{Source: src} }
```

- **Expected:** Package compiles with the new type

### Step 2 — `backend/internal/contribution/exporter.go` · `new: (*Exporter).Export` · new
- **Do:** Add Export(ctx context.Context, worldID, roundID string) (Export, error): call Source.ListByRound and Source.FrozenIDs, index the contributions by ID in a map, then for each frozen id in order append ExportContribution{ID: c.ID, Author: c.PlayerID, Content: c.Prompt, CreatedAt: c.CreatedAt} when present in the map; return Export{Version: ExportVersion, WorldID: worldID, RoundID: roundID, Contributions: out}

```
byID := map[string]Contribution{}
for _, c := range list { byID[c.ID] = c }
out := []ExportContribution{}
for _, id := range ids { if c, ok := byID[id]; ok { out = append(out, ExportContribution{ID: c.ID, Author: c.PlayerID, Content: c.Prompt, CreatedAt: c.CreatedAt}) } }
```

- **Expected:** Export returns frozen-only contributions

## Acceptance criteria
- Exporter.Export returns only frozen contributions in snapshot order
- Fields map PlayerID to Author and Prompt to Content

## Definition of done
- exporter.go compiles with go build ./internal/contribution
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-266.md`

## Scan baseline
- Scan version: `v1`
- Scan tip: `9cda5131c65b08541fc685d8a0898d39a0e9e9fa`

## Links
- Evidence: EVD-053
- Requirement: REQ-133
- Unit (Act): UNIT-266
- Unit (Verify): UNIT-268
- Status: completed
- Change: UPDATE
