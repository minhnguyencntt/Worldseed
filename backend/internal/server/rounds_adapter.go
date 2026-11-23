package server

import (
	"context"
	"errors"
	"fmt"

	"github.com/worldseed/storyforge/backend/internal/admin"
	"github.com/worldseed/storyforge/backend/internal/round"
	"github.com/worldseed/storyforge/backend/internal/world"
)

// toWorldRound converts a round record to the admin-facing world.Round shape.
func toWorldRound(r round.Round) world.Round {
	return world.Round{
		ID:       r.ID,
		Number:   r.Number,
		Status:   string(r.Status),
		StartsAt: r.StartsAt,
		EndsAt:   r.EndsAt,
	}
}

// mapRoundErr wraps round sentinels as the admin sentinels RoundHandler maps to HTTP
// statuses. Any other error is returned unchanged.
func mapRoundErr(err error) error {
	switch {
	case errors.Is(err, round.ErrNotFound):
		return fmt.Errorf("%w: %v", admin.ErrNotFound, err)
	case errors.Is(err, round.ErrIllegalTransition), errors.Is(err, round.ErrActiveRound):
		return fmt.Errorf("%w: %v", admin.ErrConflict, err)
	}
	return err
}

// roundAdmin adapts *round.Service to admin.RoundService.
type roundAdmin struct {
	Svc *round.Service
}

var _ admin.RoundService = (*roundAdmin)(nil)

// Create creates the next round of in.WorldID.
func (a *roundAdmin) Create(ctx context.Context, in admin.CreateRoundInput) (world.Round, error) {
	rd, err := a.Svc.Create(ctx, in.WorldID, in.StartsAt, in.Duration, in.BaseRelease)
	return toWorldRound(rd), mapRoundErr(err)
}

// Open opens a SCHEDULED round and returns its stored state.
func (a *roundAdmin) Open(ctx context.Context, worldID, roundID string) (world.Round, error) {
	if err := a.Svc.Open(ctx, worldID, roundID, round.OpenOptions{}); err != nil {
		return world.Round{}, mapRoundErr(err)
	}
	return a.Get(ctx, worldID, roundID)
}

// Close freezes an OPEN round and returns its stored state.
func (a *roundAdmin) Close(ctx context.Context, worldID, roundID string) (world.Round, error) {
	if err := a.Svc.Close(ctx, worldID, roundID); err != nil {
		return world.Round{}, mapRoundErr(err)
	}
	return a.Get(ctx, worldID, roundID)
}

// Get returns the round with the given IDs.
func (a *roundAdmin) Get(_ context.Context, worldID, roundID string) (world.Round, error) {
	rd, err := a.Svc.Get(worldID, roundID)
	return toWorldRound(rd), mapRoundErr(err)
}
