package contribution

import "context"

// Exporter builds an Export for a Round from the contributions that were
// frozen into the Round's snapshot.
type Exporter struct {
	// Source supplies the Round's contributions and its frozen ids.
	Source ExportSource
}

// NewExporter returns an Exporter that reads from src.
func NewExporter(src ExportSource) *Exporter {
	return &Exporter{Source: src}
}

// Export builds the Export for the given World and Round. Only contributions
// whose ids are frozen in the Round's snapshot are included, in the order the
// snapshot lists them. Frozen ids with no matching contribution are skipped.
// Errors from the source are returned unchanged.
func (e *Exporter) Export(ctx context.Context, worldID, roundID string) (Export, error) {
	list, err := e.Source.ListByRound(ctx, worldID, roundID)
	if err != nil {
		return Export{}, err
	}
	ids, err := e.Source.FrozenIDs(ctx, worldID, roundID)
	if err != nil {
		return Export{}, err
	}

	byID := map[string]Contribution{}
	for _, c := range list {
		byID[c.ID] = c
	}

	out := []ExportContribution{}
	for _, id := range ids {
		if c, ok := byID[id]; ok {
			out = append(out, ExportContribution{
				ID:        c.ID,
				Author:    c.PlayerID,
				Content:   c.Prompt,
				CreatedAt: c.CreatedAt,
			})
		}
	}

	return Export{
		Version:       ExportVersion,
		WorldID:       worldID,
		RoundID:       roundID,
		Contributions: out,
	}, nil
}
