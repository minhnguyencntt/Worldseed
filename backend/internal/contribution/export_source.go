package contribution

import "context"

// ExportSource lists the contributions that belong to a round so they can be
// exported. Implementations return every contribution in the given world's
// round.
type ExportSource interface {
	// ListByRound returns every contribution in the given world's round.
	ListByRound(ctx context.Context, worldID, roundID string) ([]Contribution, error)

	// FrozenIDs returns the ids frozen in the round's snapshot.yaml, or
	// ErrNotFound when the round has no snapshot.
	FrozenIDs(ctx context.Context, worldID, roundID string) ([]string, error)
}

var _ ExportSource = (*FileStore)(nil)
