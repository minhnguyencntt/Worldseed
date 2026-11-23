package runner

import (
	"context"
	"errors"
	"testing"
	"time"

	"github.com/worldseed/storyforge/worker/internal/store"
)

// TestRunTimeoutRetriedOnceThenErrTimeout verifies that a timed-out attempt is
// retried once and that the final failure wraps ErrTimeout.
// Given the agent blocks until its context ends, a 20ms timeout and MaxRetries of 1,
// When Run is called,
// Then the agent runs twice, the returned error wraps both ErrTimeout and
// context.DeadlineExceeded, and the stored record is FAILED.
func TestRunTimeoutRetriedOnceThenErrTimeout(t *testing.T) {
	agent := &fakeAgent{block: true}
	h := newRunner(t, Config{MaxRetries: 1, Timeout: 20 * time.Millisecond}, agent)

	_, err := h.r.Run(context.Background(), "EXEC-1", "ROUND-0000001")
	if agent.calls != 2 {
		t.Errorf("agent.calls = %d; want 2 (first attempt plus one retry)", agent.calls)
	}
	if !errors.Is(err, ErrTimeout) {
		t.Errorf("Run error = %v; want errors.Is(err, ErrTimeout)", err)
	}
	if !errors.Is(err, context.DeadlineExceeded) {
		t.Errorf("Run error = %v; want errors.Is(err, context.DeadlineExceeded)", err)
	}

	got, gerr := h.st.Get("EXEC-1")
	if gerr != nil {
		t.Fatalf("store.Get(EXEC-1) returned error: %v", gerr)
	}
	if got.Status != store.StatusFailed {
		t.Errorf("stored status = %q; want %q", got.Status, store.StatusFailed)
	}
}

// TestRunParentCancelNotErrTimeout verifies that a cancelled parent context is
// not reported as a timeout.
// Given the parent context is already cancelled, the agent blocks until its context ends,
// a 5s timeout and MaxRetries of 0,
// When Run is called,
// Then it returns an error wrapping context.Canceled that does not wrap ErrTimeout.
func TestRunParentCancelNotErrTimeout(t *testing.T) {
	ctx, cancel := context.WithCancel(context.Background())
	cancel()

	agent := &fakeAgent{block: true}
	h := newRunner(t, Config{MaxRetries: 0, Timeout: 5 * time.Second}, agent)

	_, err := h.r.Run(ctx, "EXEC-1", "ROUND-0000001")
	if err == nil {
		t.Fatalf("Run returned nil error; want non-nil error for cancelled parent")
	}
	if !errors.Is(err, context.Canceled) {
		t.Errorf("Run error = %v; want errors.Is(err, context.Canceled)", err)
	}
	if errors.Is(err, ErrTimeout) {
		t.Errorf("Run error = %v; want errors.Is(err, ErrTimeout) to be false for parent cancel", err)
	}
}
