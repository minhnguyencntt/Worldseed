package round

import (
	"context"
	"errors"
	"reflect"
	"testing"
	"time"
)

// fakeClock is a Clock whose time only moves when the test sets it.
type fakeClock struct{ now time.Time }

func (c *fakeClock) Now() time.Time { return c.now }

// call records one Controller invocation.
type call struct {
	Op      string
	WorldID string
	RoundID string
}

// fakeController records Open and Close calls and returns the configured errors.
type fakeController struct {
	calls    []call
	openErr  error
	closeErr error
}

func (c *fakeController) Open(_ context.Context, worldID, roundID string, _ OpenOptions) error {
	c.calls = append(c.calls, call{Op: "open", WorldID: worldID, RoundID: roundID})
	return c.openErr
}

func (c *fakeController) Close(_ context.Context, worldID, roundID string) error {
	c.calls = append(c.calls, call{Op: "close", WorldID: worldID, RoundID: roundID})
	return c.closeErr
}

// fakeLister returns fixed rounds per world.
type fakeLister map[string][]Round

func (l fakeLister) List(worldID string) ([]Round, error) {
	return l[worldID], nil
}

var fixedNow = time.Date(2026, 1, 1, 12, 0, 0, 0, time.UTC)

func at(hour, minute int) time.Time {
	return time.Date(2026, 1, 1, hour, minute, 0, 0, time.UTC)
}

func newScheduler(clock Clock, ctrl Controller, rounds fakeLister) *Scheduler {
	return &Scheduler{
		Controller: ctrl,
		Rounds:     rounds,
		Worlds: func() ([]string, error) {
			ids := make([]string, 0, len(rounds))
			for id := range rounds {
				ids = append(ids, id)
			}
			return ids, nil
		},
		Clock: clock,
	}
}

// TestTick_OpensDueRound: a SCHEDULED round whose start time has passed is opened.
func TestTick_OpensDueRound(t *testing.T) {
	clock := &fakeClock{now: fixedNow}
	ctrl := &fakeController{}
	rounds := fakeLister{
		"w1": {{ID: "r1", Status: StatusScheduled, StartsAt: at(11, 0), EndsAt: at(13, 0)}},
	}

	if err := newScheduler(clock, ctrl, rounds).Tick(context.Background()); err != nil {
		t.Fatalf("Tick() error = %v, want nil", err)
	}

	want := []call{{Op: "open", WorldID: "w1", RoundID: "r1"}}
	if !reflect.DeepEqual(ctrl.calls, want) {
		t.Fatalf("calls = %+v, want %+v", ctrl.calls, want)
	}
}

// TestTick_ClosesExpiredRound: an OPEN round whose end time has passed is closed.
func TestTick_ClosesExpiredRound(t *testing.T) {
	clock := &fakeClock{now: fixedNow}
	ctrl := &fakeController{}
	rounds := fakeLister{
		"w1": {{ID: "r1", Status: StatusOpen, StartsAt: at(10, 0), EndsAt: at(11, 59)}},
	}

	if err := newScheduler(clock, ctrl, rounds).Tick(context.Background()); err != nil {
		t.Fatalf("Tick() error = %v, want nil", err)
	}

	want := []call{{Op: "close", WorldID: "w1", RoundID: "r1"}}
	if !reflect.DeepEqual(ctrl.calls, want) {
		t.Fatalf("calls = %+v, want %+v", ctrl.calls, want)
	}
}

// TestTick_IgnoresFutureAndOtherStatuses: future and COMPLETED rounds produce no
// calls until the clock reaches their boundary, then the due ones are acted on.
func TestTick_IgnoresFutureAndOtherStatuses(t *testing.T) {
	clock := &fakeClock{now: fixedNow}
	ctrl := &fakeController{}
	rounds := fakeLister{
		"w1": {
			{ID: "future-scheduled", Status: StatusScheduled, StartsAt: at(13, 0), EndsAt: at(14, 0)},
			{ID: "future-open", Status: StatusOpen, StartsAt: at(10, 0), EndsAt: at(13, 0)},
			{ID: "done", Status: "COMPLETED", StartsAt: at(9, 0), EndsAt: at(10, 0)},
		},
	}
	s := newScheduler(clock, ctrl, rounds)

	if err := s.Tick(context.Background()); err != nil {
		t.Fatalf("Tick() at 12:00 error = %v, want nil", err)
	}
	if len(ctrl.calls) != 0 {
		t.Fatalf("calls at 12:00 = %+v, want none", ctrl.calls)
	}

	clock.now = at(13, 0)
	if err := s.Tick(context.Background()); err != nil {
		t.Fatalf("Tick() at 13:00 error = %v, want nil", err)
	}
	want := []call{
		{Op: "open", WorldID: "w1", RoundID: "future-scheduled"},
		{Op: "close", WorldID: "w1", RoundID: "future-open"},
	}
	if !reflect.DeepEqual(ctrl.calls, want) {
		t.Fatalf("calls at 13:00 = %+v, want %+v", ctrl.calls, want)
	}
}

// TestTick_OpenErrorIsReturnedAndCloseStillRuns: a failing Open is returned from
// Tick, and the Close for another due round still runs.
func TestTick_OpenErrorIsReturnedAndCloseStillRuns(t *testing.T) {
	openErr := errors.New("boom")
	clock := &fakeClock{now: fixedNow}
	ctrl := &fakeController{openErr: openErr}
	rounds := fakeLister{
		"w1": {
			{ID: "due-scheduled", Status: StatusScheduled, StartsAt: at(11, 0), EndsAt: at(13, 0)},
			{ID: "expired-open", Status: StatusOpen, StartsAt: at(10, 0), EndsAt: at(11, 59)},
		},
	}

	err := newScheduler(clock, ctrl, rounds).Tick(context.Background())
	if !errors.Is(err, openErr) {
		t.Fatalf("Tick() error = %v, want it to wrap %v", err, openErr)
	}

	want := []call{
		{Op: "open", WorldID: "w1", RoundID: "due-scheduled"},
		{Op: "close", WorldID: "w1", RoundID: "expired-open"},
	}
	if !reflect.DeepEqual(ctrl.calls, want) {
		t.Fatalf("calls = %+v, want %+v", ctrl.calls, want)
	}
}
