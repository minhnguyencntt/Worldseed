package runner

import (
	"context"
	"errors"
	"path/filepath"
	"testing"

	"github.com/worldseed/storyforge/worker/internal/store"
)

// TestRunGateBlocksPublish verifies that with AutoPublish off a successful run waits for approval.
// Given the agent succeeds and AutoPublish is false,
// When Run is called,
// Then the returned and stored status is AWAITING_APPROVAL, the publisher is never called and no worktree is removed.
func TestRunGateBlocksPublish(t *testing.T) {
	agent := &fakeAgent{cost: 0.5}
	h := newRunner(t, Config{AutoPublish: false}, agent)

	got, err := h.r.Run(context.Background(), "EXEC-1", "ROUND-0000001")
	if err != nil {
		t.Fatalf("Run returned error: %v", err)
	}
	if got.Status != store.StatusAwaitingApproval {
		t.Errorf("returned status = %q; want %q", got.Status, store.StatusAwaitingApproval)
	}

	stored, gerr := h.st.Get("EXEC-1")
	if gerr != nil {
		t.Fatalf("store.Get(EXEC-1) returned error: %v", gerr)
	}
	if stored.Status != store.StatusAwaitingApproval {
		t.Errorf("stored status = %q; want %q", stored.Status, store.StatusAwaitingApproval)
	}
	if h.pub.calls != nil && len(h.pub.calls) != 0 {
		t.Errorf("publish calls = %v; want none", h.pub.calls)
	}
	if len(h.trees.removed) != 0 {
		t.Errorf("worktrees removed = %v; want none", h.trees.removed)
	}
}

// TestRunGateAutoPublish verifies that with AutoPublish on a successful run publishes its work directory and completes.
// Given the agent succeeds and AutoPublish is true,
// When Run is called,
// Then the publisher is called exactly once with WorkRoot/EXEC-1 and the stored status is COMPLETED.
func TestRunGateAutoPublish(t *testing.T) {
	agent := &fakeAgent{cost: 0.5}
	h := newRunner(t, Config{AutoPublish: true}, agent)

	got, err := h.r.Run(context.Background(), "EXEC-1", "ROUND-0000001")
	if err != nil {
		t.Fatalf("Run returned error: %v", err)
	}
	if got.Status != store.StatusCompleted {
		t.Errorf("returned status = %q; want %q", got.Status, store.StatusCompleted)
	}

	stored, gerr := h.st.Get("EXEC-1")
	if gerr != nil {
		t.Fatalf("store.Get(EXEC-1) returned error: %v", gerr)
	}
	if stored.Status != store.StatusCompleted {
		t.Errorf("stored status = %q; want %q", stored.Status, store.StatusCompleted)
	}

	want := filepath.Join(h.cfg.WorkRoot, "EXEC-1")
	if len(h.pub.calls) != 1 {
		t.Fatalf("publish calls = %v; want exactly one call", h.pub.calls)
	}
	if h.pub.calls[0] != want {
		t.Errorf("publish workDir = %q; want %q", h.pub.calls[0], want)
	}
}

// TestRunGatePublishError verifies that a publish failure fails the execution and is returned to the caller.
// Given the agent succeeds, AutoPublish is true and the publisher fails with "boom",
// When Run is called,
// Then it returns an error that wraps "boom" and the stored status is FAILED.
func TestRunGatePublishError(t *testing.T) {
	boom := errors.New("boom")
	agent := &fakeAgent{cost: 0.5}
	h := newRunner(t, Config{AutoPublish: true}, agent)
	h.pub.err = boom

	_, err := h.r.Run(context.Background(), "EXEC-1", "ROUND-0000001")
	if !errors.Is(err, boom) {
		t.Fatalf("Run error = %v; want errors.Is(err, boom)", err)
	}

	stored, gerr := h.st.Get("EXEC-1")
	if gerr != nil {
		t.Fatalf("store.Get(EXEC-1) returned error: %v", gerr)
	}
	if stored.Status != store.StatusFailed {
		t.Errorf("stored status = %q; want %q", stored.Status, store.StatusFailed)
	}
}
