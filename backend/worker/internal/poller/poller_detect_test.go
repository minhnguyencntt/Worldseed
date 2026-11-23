package poller

import (
	"context"
	"reflect"
	"testing"
	"time"
)

// fakeGit is an in-memory Git. It records the order of Pull and ListRounds
// calls and returns the configured Rounds and errors.
type fakeGit struct {
	rounds  []Round
	pullErr error
	listErr error
	calls   []string
}

func (f *fakeGit) Pull(ctx context.Context) error {
	f.calls = append(f.calls, "pull")
	return f.pullErr
}

func (f *fakeGit) ListRounds(ctx context.Context, worldID string) ([]Round, error) {
	f.calls = append(f.calls, "list")
	if f.listErr != nil {
		return nil, f.listErr
	}
	return f.rounds, nil
}

// fakeCloser is an in-memory Closer. It records the ID of every Round it is
// asked to close and returns errFor[roundID] when configured.
type fakeCloser struct {
	calls  []string
	errFor map[string]error
}

func (f *fakeCloser) Close(ctx context.Context, worldID, roundID string) error {
	f.calls = append(f.calls, roundID)
	return f.errFor[roundID]
}

// fakeClock returns a fixed time.
type fakeClock struct {
	now time.Time
}

func (f fakeClock) Now() time.Time {
	return f.now
}

// TestPollDetectsScheduledAndClosed checks that a Poll pass reports SCHEDULED
// and CLOSED Rounds, does not close anything, and pulls before listing.
//
// Given a world with R1 SCHEDULED, R2 OPEN ending one hour after the clock,
// and R3 CLOSED,
// When Poll runs,
// Then Scheduled is [R1], Closed is [R3], ClosedNow is empty, no error is
// returned, nothing is closed, and git is called as pull then list.
func TestPollDetectsScheduledAndClosed(t *testing.T) {
	now := time.Date(2026, 11, 23, 10, 0, 0, 0, time.UTC)
	git := &fakeGit{
		rounds: []Round{
			{ID: "R1", WorldID: "W1", Status: StatusScheduled, EndsAt: now.Add(24 * time.Hour)},
			{ID: "R2", WorldID: "W1", Status: StatusOpen, EndsAt: now.Add(time.Hour)},
			{ID: "R3", WorldID: "W1", Status: StatusClosed, EndsAt: now.Add(-time.Hour)},
		},
	}
	closer := &fakeCloser{}
	p := New("W1", git, closer, fakeClock{now: now})

	res, err := p.Poll(context.Background())

	if err != nil {
		t.Fatalf("Poll() error = %v, want nil", err)
	}
	if want := []string{"R1"}; !reflect.DeepEqual(res.Scheduled, want) {
		t.Errorf("Result.Scheduled = %v, want %v", res.Scheduled, want)
	}
	if want := []string{"R3"}; !reflect.DeepEqual(res.Closed, want) {
		t.Errorf("Result.Closed = %v, want %v", res.Closed, want)
	}
	if len(res.ClosedNow) != 0 {
		t.Errorf("Result.ClosedNow = %v, want empty", res.ClosedNow)
	}
	if len(closer.calls) != 0 {
		t.Errorf("closer.calls = %v, want none", closer.calls)
	}
	if want := []string{"pull", "list"}; !reflect.DeepEqual(git.calls, want) {
		t.Errorf("git.calls = %v, want %v", git.calls, want)
	}
}

// TestPollNoRounds checks that a world with no Rounds yields empty results.
//
// Given a fake Git with no Rounds,
// When Poll runs,
// Then no error is returned and Scheduled, Closed and ClosedNow are empty.
func TestPollNoRounds(t *testing.T) {
	git := &fakeGit{}
	closer := &fakeCloser{}
	p := New("W1", git, closer, fakeClock{now: time.Now()})

	res, err := p.Poll(context.Background())

	if err != nil {
		t.Fatalf("Poll() error = %v, want nil", err)
	}
	if len(res.Scheduled) != 0 {
		t.Errorf("len(Result.Scheduled) = %d, want 0", len(res.Scheduled))
	}
	if len(res.Closed) != 0 {
		t.Errorf("len(Result.Closed) = %d, want 0", len(res.Closed))
	}
	if len(res.ClosedNow) != 0 {
		t.Errorf("len(Result.ClosedNow) = %d, want 0", len(res.ClosedNow))
	}
}
