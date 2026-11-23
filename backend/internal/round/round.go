// Package round holds the Round model, its lifecycle transition table and the
// Git-backed file store that persists each round as worlds/<world>/rounds/<round>/round.yaml.
package round

import (
	"errors"
	"fmt"
	"time"
)

// ErrIllegalTransition is returned (wrapped) when a Round is asked to move to a status
// its lifecycle does not allow from its current status.
var ErrIllegalTransition = errors.New("round: illegal transition")

// Status is one state in the Round lifecycle.
type Status string

// Round lifecycle states, in the order of the Continuous Cycle. NEXT ROUND OPEN is not
// a state of this round: it is the OPEN state of the following round.
const (
	StatusScheduled  Status = "SCHEDULED"
	StatusOpen       Status = "OPEN"
	StatusClosed     Status = "CLOSED"
	StatusAnalyzing  Status = "ANALYZING"
	StatusPlanning   Status = "PLANNING"
	StatusDeveloping Status = "DEVELOPING"
	StatusTesting    Status = "TESTING"
	StatusBuilding   Status = "BUILDING"
	StatusPublishing Status = "PUBLISHING"
	StatusCompleted  Status = "COMPLETED"
	StatusFailed     Status = "FAILED"
	StatusCancelled  Status = "CANCELLED"
	StatusRecovering Status = "RECOVERING"
)

// Transitions lists, for each status, the statuses a Round may move to next.
// The forward path is SCHEDULED -> OPEN -> CLOSED -> ANALYZING -> PLANNING ->
// DEVELOPING -> TESTING -> BUILDING -> PUBLISHING -> COMPLETED. Any development
// stage may fail; a failed round is recovered (retried from a development stage)
// or cancelled. COMPLETED is terminal for this round: the next round is a new Round.
var Transitions = map[Status][]Status{
	StatusScheduled:  {StatusOpen, StatusCancelled},
	StatusOpen:       {StatusClosed, StatusCancelled},
	StatusClosed:     {StatusAnalyzing, StatusFailed},
	StatusAnalyzing:  {StatusPlanning, StatusFailed},
	StatusPlanning:   {StatusDeveloping, StatusFailed},
	StatusDeveloping: {StatusTesting, StatusFailed},
	StatusTesting:    {StatusBuilding, StatusFailed},
	StatusBuilding:   {StatusPublishing, StatusFailed},
	StatusPublishing: {StatusCompleted, StatusFailed},
	StatusCompleted:  {},
	StatusFailed:     {StatusRecovering, StatusCancelled},
	StatusRecovering: {StatusAnalyzing, StatusPlanning, StatusDeveloping, StatusTesting, StatusBuilding, StatusPublishing, StatusCancelled},
	StatusCancelled:  {},
}

// CanTransition reports whether the lifecycle allows a move from one status to another.
func CanTransition(from, to Status) bool {
	for _, next := range Transitions[from] {
		if next == to {
			return true
		}
	}
	return false
}

// Round is one round record stored in round.yaml.
type Round struct {
	ID          string     `yaml:"id"`
	WorldID     string     `yaml:"world"`
	Number      int        `yaml:"number"`
	Status      Status     `yaml:"status"`
	StartsAt    time.Time  `yaml:"starts_at"`
	EndsAt      time.Time  `yaml:"ends_at"`
	BaseRelease string     `yaml:"base_release"`
	FreezeCommit string    `yaml:"freeze_commit,omitempty"`
	ClosedAt    *time.Time `yaml:"closed_at,omitempty"`
}

// Transition moves the round to status to. It changes Status only when the lifecycle
// allows the move; otherwise it returns an error wrapping ErrIllegalTransition and
// leaves the round unchanged.
func (r *Round) Transition(to Status) error {
	if !CanTransition(r.Status, to) {
		return fmt.Errorf("%w: %s -> %s", ErrIllegalTransition, r.Status, to)
	}
	r.Status = to
	return nil
}
