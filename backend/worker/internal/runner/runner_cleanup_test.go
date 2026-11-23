package runner

import (
	"context"
	"errors"
	"strings"
	"testing"

	"github.com/worldseed/storyforge/worker/internal/store"
)

// createFailTrees is a Worktrees fake whose Create always fails, as when git is unavailable.
type createFailTrees struct {
	fakeTrees
}

func (c *createFailTrees) Create(_ context.Context, _ string) error {
	return errors.New("no git")
}

// TestRunCreateWorktreeError verifies that a failing worktree creation fails the run before the agent starts.
// Given the worktree Create call fails with "no git",
// When Run is called,
// Then the returned error contains "no git", the agent never runs and the stored status stays RUNNING.
func TestRunCreateWorktreeError(t *testing.T) {
	agent := &fakeAgent{}
	h := newRunner(t, Config{}, agent)
	h.r.trees = &createFailTrees{}

	_, err := h.r.Run(context.Background(), "EXEC-1", "ROUND-0000001")
	if err == nil || !strings.Contains(err.Error(), "no git") {
		t.Fatalf("Run error = %v; want an error containing %q", err, "no git")
	}
	if agent.calls != 0 {
		t.Errorf("agent.calls = %d; want 0", agent.calls)
	}

	got, gerr := h.st.Get("EXEC-1")
	if gerr != nil {
		t.Fatalf("store.Get(EXEC-1) returned error: %v", gerr)
	}
	if got.Status != store.StatusRunning {
		t.Errorf("stored status = %q; want %q", got.Status, store.StatusRunning)
	}
}

// TestRunFailureRemovesWorktree verifies that a failed run with no retries removes its worktree and never publishes.
// Given the agent fails once and MaxRetries is 0,
// When Run is called,
// Then the worktree is removed exactly once, the publisher is never called and Run returns an error.
func TestRunFailureRemovesWorktree(t *testing.T) {
	agent := &fakeAgent{errs: []error{errors.New("agent failed")}}
	h := newRunner(t, Config{MaxRetries: 0}, agent)

	_, err := h.r.Run(context.Background(), "EXEC-1", "ROUND-0000001")
	if err == nil {
		t.Fatal("Run returned nil error; want an error from the failed agent")
	}
	if len(h.trees.removed) != 1 {
		t.Errorf("worktrees removed = %v; want exactly one removal", h.trees.removed)
	}
	if len(h.pub.calls) != 0 {
		t.Errorf("publish calls = %v; want none", h.pub.calls)
	}
}
