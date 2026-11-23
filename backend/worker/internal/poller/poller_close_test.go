package poller

import (
	"context"
	"reflect"
	"testing"
	"time"
)

// TestPollClosesExpiredOpenRound checks that a Poll pass closes every OPEN
// Round whose end time has been reached and leaves the others open.
//
// Given a clock at 12:00 UTC and a world with E1 OPEN ending at 11:00,
// E2 OPEN ending exactly at 12:00, and F1 OPEN ending at 13:00,
// When Poll runs,
// Then the Closer is asked to close E1 and E2 in list order, ClosedNow and
// Closed are [E1, E2], no error is returned, and F1 is not closed.
func TestPollClosesExpiredOpenRound(t *testing.T) {
	now := time.Date(2026, 11, 23, 12, 0, 0, 0, time.UTC)
	git := &fakeGit{
		rounds: []Round{
			{ID: "E1", WorldID: "W1", Status: StatusOpen, EndsAt: now.Add(-time.Hour)},
			{ID: "E2", WorldID: "W1", Status: StatusOpen, EndsAt: now},
			{ID: "F1", WorldID: "W1", Status: StatusOpen, EndsAt: now.Add(time.Hour)},
		},
	}
	closer := &fakeCloser{}
	p := New("W1", git, closer, fakeClock{now: now})

	res, err := p.Poll(context.Background())

	if err != nil {
		t.Fatalf("Poll() error = %v, want nil", err)
	}
	if want := []string{"E1", "E2"}; !reflect.DeepEqual(closer.calls, want) {
		t.Errorf("closer.calls = %v, want %v", closer.calls, want)
	}
	if want := []string{"E1", "E2"}; !reflect.DeepEqual(res.ClosedNow, want) {
		t.Errorf("Result.ClosedNow = %v, want %v", res.ClosedNow, want)
	}
	if want := []string{"E1", "E2"}; !reflect.DeepEqual(res.Closed, want) {
		t.Errorf("Result.Closed = %v, want %v", res.Closed, want)
	}
}

// TestPollClosedAndNewlyClosedCombined checks that Result.Closed includes both
// Rounds that were already CLOSED and Rounds closed by this pass, while
// Result.ClosedNow only includes the Rounds closed by this pass.
//
// Given a world with C1 already CLOSED and E1 OPEN and expired,
// When Poll runs,
// Then Closed is [C1, E1] and ClosedNow is [E1].
func TestPollClosedAndNewlyClosedCombined(t *testing.T) {
	now := time.Date(2026, 11, 23, 12, 0, 0, 0, time.UTC)
	git := &fakeGit{
		rounds: []Round{
			{ID: "C1", WorldID: "W1", Status: StatusClosed, EndsAt: now.Add(-2 * time.Hour)},
			{ID: "E1", WorldID: "W1", Status: StatusOpen, EndsAt: now.Add(-time.Hour)},
		},
	}
	closer := &fakeCloser{}
	p := New("W1", git, closer, fakeClock{now: now})

	res, err := p.Poll(context.Background())

	if err != nil {
		t.Fatalf("Poll() error = %v, want nil", err)
	}
	if want := []string{"C1", "E1"}; !reflect.DeepEqual(res.Closed, want) {
		t.Errorf("Result.Closed = %v, want %v", res.Closed, want)
	}
	if want := []string{"E1"}; !reflect.DeepEqual(res.ClosedNow, want) {
		t.Errorf("Result.ClosedNow = %v, want %v", res.ClosedNow, want)
	}
}
