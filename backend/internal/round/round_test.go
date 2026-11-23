package round

import (
	"errors"
	"testing"
)

// Given every edge listed in the Transitions table,
// When CanTransition is asked about each edge,
// Then every listed edge is allowed.
// Given moves the lifecycle forbids (skips, reversals and leaving terminal states),
// When CanTransition is asked about each move,
// Then every forbidden move is refused.
// Given a Round in a status with an illegal target,
// When Transition is called,
// Then it returns an error wrapping ErrIllegalTransition and the status is unchanged.
func TestTransitions(t *testing.T) {
	t.Run("every listed edge is allowed", func(t *testing.T) {
		for from, targets := range Transitions {
			for _, to := range targets {
				if !CanTransition(from, to) {
					t.Errorf("CanTransition(%s, %s) = false, want true (listed in Transitions)", from, to)
				}
			}
		}
	})

	forbidden := []struct {
		name string
		from Status
		to   Status
	}{
		{name: "SCHEDULED to CLOSED skips OPEN", from: StatusScheduled, to: StatusClosed},
		{name: "OPEN back to SCHEDULED", from: StatusOpen, to: StatusScheduled},
		{name: "COMPLETED back to OPEN", from: StatusCompleted, to: StatusOpen},
		{name: "CANCELLED back to OPEN", from: StatusCancelled, to: StatusOpen},
		{name: "CLOSED back to OPEN", from: StatusClosed, to: StatusOpen},
	}
	for _, tc := range forbidden {
		t.Run("forbidden "+tc.name, func(t *testing.T) {
			if CanTransition(tc.from, tc.to) {
				t.Fatalf("CanTransition(%s, %s) = true, want false", tc.from, tc.to)
			}

			rd := Round{ID: "ROUND-0000001", WorldID: "the-boys-room", Status: tc.from}
			err := rd.Transition(tc.to)
			if !errors.Is(err, ErrIllegalTransition) {
				t.Fatalf("Transition(%s) error = %v, want errors.Is ErrIllegalTransition", tc.to, err)
			}
			if rd.Status != tc.from {
				t.Fatalf("Status after rejected Transition = %s, want unchanged %s", rd.Status, tc.from)
			}
		})
	}
}
