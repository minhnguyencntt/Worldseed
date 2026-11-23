// Package round drives the round lifecycle from a periodic scheduler.
package round

import (
	"context"
	"errors"
	"fmt"
	"log/slog"
	"time"
)

// defaultInterval is the scheduler tick used when Interval is not set.
const defaultInterval = 30 * time.Second

// Clock supplies the current time. Inject a fake in tests.
type Clock interface {
	Now() time.Time
}

// OpenOptions carries optional parameters for opening a round.
type OpenOptions struct{}

// Controller performs round lifecycle transitions.
type Controller interface {
	Open(ctx context.Context, worldID, roundID string, opts OpenOptions) error
	Close(ctx context.Context, worldID, roundID string) error
}

// Lister lists the rounds of a world.
type Lister interface {
	List(worldID string) ([]Round, error)
}

// systemClock reads the wall clock. It is used when Scheduler.Clock is nil.
type systemClock struct{}

func (systemClock) Now() time.Time { return time.Now() }

// Scheduler opens scheduled rounds whose start time has passed and closes open
// rounds whose end time has passed.
type Scheduler struct {
	Controller Controller
	Rounds     Lister
	Worlds     func() ([]string, error)
	Clock      Clock
	Interval   time.Duration
}

// Tick runs one scheduling pass over every world and round. It keeps going
// after a failure and returns all errors joined with errors.Join.
func (s *Scheduler) Tick(ctx context.Context) error {
	clock := s.clock()
	worldIDs, err := s.Worlds()
	if err != nil {
		return fmt.Errorf("round: list worlds: %w", err)
	}

	var errs []error
	for _, worldID := range worldIDs {
		rounds, err := s.Rounds.List(worldID)
		if err != nil {
			errs = append(errs, fmt.Errorf("round: list rounds for world %s: %w", worldID, err))
			continue
		}
		for _, rd := range rounds {
			now := clock.Now()
			switch {
			case rd.Status == StatusScheduled && !now.Before(rd.StartsAt):
				if err := s.Controller.Open(ctx, worldID, rd.ID, OpenOptions{}); err != nil {
					errs = append(errs, fmt.Errorf("round: open %s/%s: %w", worldID, rd.ID, err))
				}
			case rd.Status == StatusOpen && !now.Before(rd.EndsAt):
				if err := s.Controller.Close(ctx, worldID, rd.ID); err != nil {
					errs = append(errs, fmt.Errorf("round: close %s/%s: %w", worldID, rd.ID, err))
				}
			}
		}
	}
	return errors.Join(errs...)
}

// Run calls Tick every Interval until ctx is done. Tick errors are logged.
func (s *Scheduler) Run(ctx context.Context) {
	interval := s.Interval
	if interval <= 0 {
		interval = defaultInterval
	}

	ticker := time.NewTicker(interval)
	defer ticker.Stop()

	for {
		select {
		case <-ctx.Done():
			return
		case <-ticker.C:
			if err := s.Tick(ctx); err != nil {
				slog.Error("round: scheduler tick", "err", err)
			}
		}
	}
}

func (s *Scheduler) clock() Clock {
	if s.Clock == nil {
		return systemClock{}
	}
	return s.Clock
}
