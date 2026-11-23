// Package poller detects Round lifecycle changes in the case Git repository.
// It pulls the repository, lists the Rounds of a world and reports which
// Rounds are SCHEDULED, OPEN or CLOSED.
package poller

import (
	"context"
	"errors"
	"fmt"
	"time"
)

// Status is the lifecycle state of a Round. The values mirror the Round
// status names used by backend/internal/round.
type Status string

const (
	StatusScheduled Status = "SCHEDULED"
	StatusOpen      Status = "OPEN"
	StatusClosed    Status = "CLOSED"
)

// Round is a Round of a world as read from the case Git repository.
type Round struct {
	ID      string
	WorldID string
	Status  Status
	EndsAt  time.Time
}

// Git is the subset of the case repository used by the poller.
type Git interface {
	Pull(ctx context.Context) error
	ListRounds(ctx context.Context, worldID string) ([]Round, error)
}

// Closer closes one OPEN Round.
type Closer interface {
	Close(ctx context.Context, worldID, roundID string) error
}

// Clock returns the current time. It is injected so tests can control time.
type Clock interface {
	Now() time.Time
}

// Result reports what a Poll pass detected, in Round list order.
type Result struct {
	Scheduled []string
	Closed    []string
	ClosedNow []string
}

// Poller detects SCHEDULED and CLOSED Rounds of one world.
type Poller struct {
	worldID string
	git     Git
	closer  Closer
	clock   Clock
}

// New returns a Poller for worldID that uses g, c and clk.
func New(worldID string, g Git, c Closer, clk Clock) *Poller {
	return &Poller{worldID: worldID, git: g, closer: c, clock: clk}
}

// Poll pulls the repository and lists the Rounds of the world. It returns the
// IDs of SCHEDULED Rounds and CLOSED Rounds.
func (p *Poller) Poll(ctx context.Context) (Result, error) {
	var res Result

	if err := p.git.Pull(ctx); err != nil {
		return res, fmt.Errorf("poller: pull: %w", err)
	}

	rounds, err := p.git.ListRounds(ctx, p.worldID)
	if err != nil {
		return res, fmt.Errorf("poller: list rounds: %w", err)
	}

	var errs []error
	for _, r := range rounds {
		switch {
		case r.Status == StatusScheduled:
			res.Scheduled = append(res.Scheduled, r.ID)
		case r.Status == StatusClosed:
			res.Closed = append(res.Closed, r.ID)
		case r.Status == StatusOpen && !p.clock.Now().Before(r.EndsAt):
			if p.closer == nil {
				errs = append(errs, fmt.Errorf("poller: close %s: no closer configured", r.ID))
				continue
			}
			if err := p.closer.Close(ctx, p.worldID, r.ID); err != nil {
				errs = append(errs, fmt.Errorf("poller: close %s: %w", r.ID, err))
				continue
			}
			res.ClosedNow = append(res.ClosedNow, r.ID)
			res.Closed = append(res.Closed, r.ID)
		}
	}

	return res, errors.Join(errs...)
}
