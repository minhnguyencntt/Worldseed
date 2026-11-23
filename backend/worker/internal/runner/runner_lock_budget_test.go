package runner

import (
	"context"
	"errors"
	"os"
	"path/filepath"
	"strings"
	"testing"
	"time"

	"github.com/worldseed/storyforge/worker/internal/lock"
	"github.com/worldseed/storyforge/worker/internal/store"
)

// TestRunLockedLeavesNoRecord verifies that a run refused by a held World lock
// leaves no execution record and creates no worktree.
// Given the World lock file already exists,
// When Run is called,
// Then it returns an error wrapping lock.ErrLocked, the agent never runs, no worktree is created
// and no execution record is stored for EXEC-1.
func TestRunLockedLeavesNoRecord(t *testing.T) {
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
	if agent.calls != 0 {
		t.Errorf("agent.calls = %d; want 0", agent.calls)
	}
	if len(h.trees.created) != 0 {
		t.Errorf("worktrees created = %v; want none", h.trees.created)
	}
	if _, gerr := h.st.Get("EXEC-1"); gerr == nil {
		t.Errorf("store.Get(EXEC-1) returned no error; want no execution record stored")
	}
}

// TestRunBudgetExceededPersistsFailed verifies that a budget stop persists the
// execution as FAILED, wraps ErrBudgetExceeded and removes the worktree once.
// Given each agent call costs 3.0, every call fails, MaxRetries is 5 and MaxBudget is 5.0,
// When Run is called,
// Then it returns an error wrapping ErrBudgetExceeded after two attempts, the stored record is
// FAILED with an error mentioning "budget exceeded", and the worktree is removed exactly once.
func TestRunBudgetExceededPersistsFailed(t *testing.T) {
	agent := &fakeAgent{
		cost: 3.0,
		errs: []error{
			errors.New("a"), errors.New("b"), errors.New("c"),
			errors.New("d"), errors.New("e"), errors.New("f"),
		},
	}
	h := newRunner(t, Config{MaxRetries: 5, MaxBudget: 5.0, Timeout: 5 * time.Second}, agent)

	_, err := h.r.Run(context.Background(), "EXEC-1", "ROUND-0000001")
	if !errors.Is(err, ErrBudgetExceeded) {
		t.Fatalf("Run error = %v; want errors.Is(err, ErrBudgetExceeded)", err)
	}
	if agent.calls != 2 {
		t.Errorf("agent.calls = %d; want 2", agent.calls)
	}

	got, gerr := h.st.Get("EXEC-1")
	if gerr != nil {
		t.Fatalf("store.Get(EXEC-1) returned error: %v", gerr)
	}
	if got.Status != store.StatusFailed {
		t.Errorf("stored Status = %q; want %q", got.Status, store.StatusFailed)
	}
	if !strings.Contains(got.Error, "budget exceeded") {
		t.Errorf("stored Error = %q; want it to contain %q", got.Error, "budget exceeded")
	}
	if len(h.trees.removed) != 1 {
		t.Errorf("worktrees removed = %v; want exactly one removal", h.trees.removed)
	}
}
