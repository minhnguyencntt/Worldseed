package contribution

import "context"

// ExportSource lists the contributions that belong to a round so they can be
// exported. Implementations return every contribution in the given world's
// round.
type ExportSource interface {
	// ListByRound returns every contribution in the given world's round.
	ListByRound(ctx context.Context, worldID, roundID string) ([]Contribution, error)
}

var _ ExportSource = (*FileStore)(nil)
