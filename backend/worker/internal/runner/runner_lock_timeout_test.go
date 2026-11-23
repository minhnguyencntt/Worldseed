package runner

import (
	"context"
	"errors"
	"os"
	"path/filepath"
	"testing"
	"time"

	"github.com/worldseed/storyforge/worker/internal/lock"
)

// TestRunLockedKeepsForeignLock verifies that a run that finds a lock held by
// someone else leaves that lock in place and does not touch the execution.
// Given a foreign process already holds the World lock file,
// When Run is called,
// Then it returns an error wrapping lock.ErrLocked, the lock file still exists,
// no execution record is stored and the agent never runs.
func TestRunLockedKeepsForeignLock(t *testing.T) {
	agent := &fakeAgent{}
	h := newRunner(t, Config{}, agent)

	if err := os.MkdirAll(filepath.Dir(h.cfg.LockPath), 0o755); err != nil {
		t.Fatalf("MkdirAll: %v", err)
	}
	if err := os.WriteFile(h.cfg.LockPath, []byte("999"), 0o600); err != nil {
		t.Fatalf("WriteFile(%q): %v", h.cfg.LockPath, err)
	}

	_, err := h.r.Run(context.Background(), "EXEC-1", "ROUND-0000001")
	if !errors.Is(err, lock.ErrLocked) {
		t.Fatalf("Run error = %v; want errors.Is(err, lock.ErrLocked)", err)
	}

	if _, serr := os.Stat(h.cfg.LockPath); serr != nil {
		t.Errorf("os.Stat(%q) error = %v; want the foreign lock to remain", h.cfg.LockPath, serr)
	}
	if _, gerr := h.st.Get("EXEC-1"); gerr == nil {
		t.Errorf("store.Get(EXEC-1) returned no error; want no execution record stored")
	}
	if agent.calls != 0 {
		t.Errorf("agent.calls = %d; want 0", agent.calls)
	}
}

// TestRunTimeoutPerAttempt verifies that every attempt gets its own timeout and
// that retries continue until MaxRetries is exhausted.
// Given the agent blocks until its context ends, a 20ms timeout and one retry,
// When Run is called,
// Then the agent runs twice, each attempt ends with context.DeadlineExceeded,
// and Run returns an error wrapping context.DeadlineExceeded.
func TestRunTimeoutPerAttempt(t *testing.T) {
	agent := &fakeAgent{block: true}
	h := newRunner(t, Config{Timeout: 20 * time.Millisecond, MaxRetries: 1}, agent)

	_, err := h.r.Run(context.Background(), "EXEC-1", "ROUND-0000001")
	if !errors.Is(err, context.DeadlineExceeded) {
		t.Fatalf("Run error = %v; want errors.Is(err, context.DeadlineExceeded)", err)
	}
	if agent.calls != 2 {
		t.Errorf("agent.calls = %d; want 2 (one per attempt)", agent.calls)
	}
}
