package runner

import (
	"context"
	"errors"
	"path/filepath"
	"reflect"
	"strings"
	"testing"
	"time"

	"github.com/worldseed/storyforge/worker/internal/store"
)

// TestRunRetryExhaustedRemovesWorktreeOnce verifies that exhausting MaxRetries fails the execution
// and removes its worktree exactly once.
// Given MaxRetries is 2 and the agent fails on all three attempts,
// When Run is called,
// Then it returns an error, the agent ran three times, the stored status is FAILED with the last error text,
// and the worktree under WorkRoot/EXEC-1 is removed exactly once.
func TestRunRetryExhaustedRemovesWorktreeOnce(t *testing.T) {
	agent := &fakeAgent{errs: []error{errors.New("e1"), errors.New("e2"), errors.New("e3")}}
	h := newRunner(t, Config{MaxRetries: 2, Timeout: 5 * time.Second}, agent)

	if _, err := h.r.Run(context.Background(), "EXEC-1", "ROUND-0000001"); err == nil {
		t.Fatalf("Run returned nil error; want an error after retries are exhausted")
	}
	if agent.calls != 3 {
		t.Errorf("agent.calls = %d; want 3", agent.calls)
	}

	got, err := h.st.Get("EXEC-1")
	if err != nil {
		t.Fatalf("store.Get(EXEC-1) returned error: %v", err)
	}
	if got.Status != store.StatusFailed {
		t.Errorf("stored status = %q; want %q", got.Status, store.StatusFailed)
	}
	if !strings.Contains(got.Error, "e3") {
		t.Errorf("stored error = %q; want it to contain %q", got.Error, "e3")
	}

	want := []string{filepath.Join(h.cfg.WorkRoot, "EXEC-1")}
	if !reflect.DeepEqual(h.trees.removed, want) {
		t.Errorf("worktrees removed = %v; want %v", h.trees.removed, want)
	}
}
