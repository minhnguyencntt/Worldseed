package server

import (
	"errors"
	"fmt"
	"testing"
	"time"

	"github.com/worldseed/storyforge/backend/internal/admin"
	"github.com/worldseed/storyforge/backend/internal/round"
)

// TestToWorldRound verifies that toWorldRound copies every field of a round record
// onto the admin-facing world.Round, with the status rendered as its string value.
func TestToWorldRound(t *testing.T) {
	startsAt := time.Date(2026, 11, 23, 10, 0, 0, 0, time.UTC)
	endsAt := time.Date(2026, 11, 23, 12, 30, 0, 0, time.UTC)

	in := round.Round{
		ID:       "ROUND-0000001",
		Number:   1,
		Status:   round.StatusOpen,
		StartsAt: startsAt,
		EndsAt:   endsAt,
	}

	got := toWorldRound(in)

	if got.ID != "ROUND-0000001" {
		t.Errorf("ID = %q, want %q", got.ID, "ROUND-0000001")
	}
	if got.Number != 1 {
		t.Errorf("Number = %d, want 1", got.Number)
	}
	if got.Status != "OPEN" {
		t.Errorf("Status = %q, want %q", got.Status, "OPEN")
	}
	if !got.StartsAt.Equal(startsAt) {
		t.Errorf("StartsAt = %v, want %v", got.StartsAt, startsAt)
	}
	if !got.EndsAt.Equal(endsAt) {
		t.Errorf("EndsAt = %v, want %v", got.EndsAt, endsAt)
	}
}

// TestMapRoundErr verifies that round sentinel errors are wrapped as the admin
// sentinels RoundHandler maps to HTTP statuses, and that unknown errors pass through.
func TestMapRoundErr(t *testing.T) {
	boom := errors.New("boom")

	tests := []struct {
		name      string
		in        error
		want      error // admin sentinel expected via errors.Is; ignored when unchanged is true
		unchanged bool  // true when the input error must be returned as-is
	}{
		{
			name: "round not found maps to admin.ErrNotFound",
			in:   round.ErrNotFound,
			want: admin.ErrNotFound,
		},
		{
			name: "wrapped illegal transition maps to admin.ErrConflict",
			in:   fmt.Errorf("%w: OPEN -> SCHEDULED", round.ErrIllegalTransition),
			want: admin.ErrConflict,
		},
		{
			name: "wrapped active round maps to admin.ErrConflict",
			in:   fmt.Errorf("%w: ROUND-0000001 is OPEN", round.ErrActiveRound),
			want: admin.ErrConflict,
		},
		{
			name:      "unknown error is returned unchanged",
			in:        boom,
			unchanged: true,
		},
	}

	for _, tc := range tests {
		t.Run(tc.name, func(t *testing.T) {
			got := mapRoundErr(tc.in)

			if tc.unchanged {
				if got != tc.in {
					t.Fatalf("mapRoundErr(%v) = %v, want the same error unchanged", tc.in, got)
				}
				return
			}
			if !errors.Is(got, tc.want) {
				t.Fatalf("mapRoundErr(%v) = %v, want errors.Is %v", tc.in, got, tc.want)
			}
		})
	}
}
