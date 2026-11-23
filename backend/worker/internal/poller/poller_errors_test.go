package poller

import (
	"context"
	"errors"
	"reflect"
	"strings"
	"testing"
	"time"
)

// errBoom is the injected failure used by the Poll error handling tests.
var errBoom = errors.New("boom")

// TestPollPullFailureAborts checks that a failing pull or list aborts the
// Poll pass before any Round is closed.
//
// Given a fake Git whose Pull fails with errBoom,
// When Poll runs,
// Then the error wraps errBoom, git is called only with pull, and nothing is
// closed or reported.
//
// Given a fake Git whose ListRounds fails with errBoom,
// When Poll runs,
// Then the error wraps errBoom and nothing is closed.
func TestPollPullFailureAborts(t *testing.T) {
	t.Run("pull fails", func(t *testing.T) {
		git := &fakeGit{pullErr: errBoom}
		closer := &fakeCloser{}
		p := New("W1", git, closer, fakeClock{now: time.Now()})

		res, err := p.Poll(context.Background())

		if !errors.Is(err, errBoom) {
			t.Fatalf("Poll() error = %v, want wrapping %v", err, errBoom)
		}
		if want := []string{"pull"}; !reflect.DeepEqual(git.calls, want) {
			t.Errorf("git.calls = %v, want %v", git.calls, want)
		}
		if len(closer.calls) != 0 {
			t.Errorf("closer.calls = %v, want none", closer.calls)
		}
		if len(res.Scheduled) != 0 || len(res.Closed) != 0 || len(res.ClosedNow) != 0 {
			t.Errorf("Result = %+v, want empty slices", res)
		}
	})

	t.Run("list fails", func(t *testing.T) {
		git := &fakeGit{listErr: errBoom}
		closer := &fakeCloser{}
		p := New("W1", git, closer, fakeClock{now: time.Now()})

		_, err := p.Poll(context.Background())

		if !errors.Is(err, errBoom) {
			t.Fatalf("Poll() error = %v, want wrapping %v", err, errBoom)
		}
		if len(closer.calls) != 0 {
			t.Errorf("closer.calls = %v, want none", closer.calls)
		}
	})
}

// TestPollCloseFailureContinues checks that a failing Close is reported but
// does not stop the remaining expired OPEN Rounds from being closed.
//
// Given expired OPEN Rounds E1 and E2 where closing E1 fails with errBoom,
// When Poll runs,
// Then the error wraps errBoom, both Rounds are attempted in order, and only
// E2 is reported as Closed and ClosedNow.
func TestPollCloseFailureContinues(t *testing.T) {
	now := time.Date(2026, 11, 23, 10, 0, 0, 0, time.UTC)
	git := &fakeGit{
		rounds: []Round{
			{ID: "E1", WorldID: "W1", Status: StatusOpen, EndsAt: now.Add(-time.Minute)},
			{ID: "E2", WorldID: "W1", Status: StatusOpen, EndsAt: now.Add(-time.Minute)},
		},
	}
	closer := &fakeCloser{errFor: map[string]error{"E1": errBoom}}
	p := New("W1", git, closer, fakeClock{now: now})

	res, err := p.Poll(context.Background())

	if !errors.Is(err, errBoom) {
		t.Fatalf("Poll() error = %v, want wrapping %v", err, errBoom)
	}
	if want := []string{"E1", "E2"}; !reflect.DeepEqual(closer.calls, want) {
		t.Errorf("closer.calls = %v, want %v", closer.calls, want)
	}
	if want := []string{"E2"}; !reflect.DeepEqual(res.Closed, want) {
		t.Errorf("Result.Closed = %v, want %v", res.Closed, want)
	}
	if want := []string{"E2"}; !reflect.DeepEqual(res.ClosedNow, want) {
		t.Errorf("Result.ClosedNow = %v, want %v", res.ClosedNow, want)
	}
}

// TestPollNilCloser checks that Poll reports an error instead of panicking
// when an expired OPEN Round needs closing and no Closer is configured.
//
// Given a Poller built with a nil Closer and one expired OPEN Round,
// When Poll runs,
// Then no panic occurs and the error message contains "no closer configured".
func TestPollNilCloser(t *testing.T) {
	now := time.Date(2026, 11, 23, 10, 0, 0, 0, time.UTC)
	git := &fakeGit{
		rounds: []Round{
			{ID: "E1", WorldID: "W1", Status: StatusOpen, EndsAt: now.Add(-time.Minute)},
		},
	}
	p := New("W1", git, nil, fakeClock{now: now})

	var (
		err      error
		panicked any
	)
	func() {
		defer func() { panicked = recover() }()
		_, err = p.Poll(context.Background())
	}()

	if panicked != nil {
		t.Fatalf("Poll() panicked: %v, want error", panicked)
	}
	if err == nil {
		t.Fatal("Poll() error = nil, want non-nil")
	}
	if !strings.Contains(err.Error(), "no closer configured") {
		t.Errorf("Poll() error = %q, want it to contain %q", err.Error(), "no closer configured")
	}
}
