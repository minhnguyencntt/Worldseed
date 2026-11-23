package runner

import (
	"context"
	"errors"
	"io/fs"
	"os"
	"path/filepath"
	"testing"
	"time"

	"github.com/worldseed/storyforge/worker/internal/lock"
	"github.com/worldseed/storyforge/worker/internal/store"
)

// fixedNow is the clock injected into the runner so timestamps are deterministic.
var fixedNow = time.Date(2026, 1, 2, 3, 4, 5, 0, time.UTC)

// fakeAgent is a test double for Agent. It records how often it ran and in
// which work directory. When block is set it waits for the context to end;
// otherwise it returns the queued errs one per call, then nil.
type fakeAgent struct {
	cost    float64
	errs    []error
	block   bool
	calls   int
	workDir string
}

func (a *fakeAgent) Run(ctx context.Context, workDir string) (float64, error) {
	a.calls++
	a.workDir = workDir
	if a.block {
		<-ctx.Done()
		return 0, ctx.Err()
	}
	if len(a.errs) == 0 {
		return a.cost, nil
	}
	err := a.errs[0]
	a.errs = a.errs[1:]
	return a.cost, err
}

// fakeTrees is a test double for Worktrees that records create and remove calls.
type fakeTrees struct {
	created []string
	removed []string
}

func (f *fakeTrees) Create(_ context.Context, dir string) error {
	f.created = append(f.created, dir)
	return nil
}

func (f *fakeTrees) Remove(_ context.Context, dir string) error {
	f.removed = append(f.removed, dir)
	return nil
}

// fakePublisher is a test double for Publisher that records each publish call.
type fakePublisher struct {
	calls []string
}

func (f *fakePublisher) Publish(_ context.Context, workDir string) error {
	f.calls = append(f.calls, workDir)
	return nil
}

// rig bundles a Runner with the fakes and store it was built from.
type rig struct {
	r     *Runner
	cfg   Config
	st    *store.Store
	trees *fakeTrees
	pub   *fakePublisher
}

// newRunner builds a Runner whose lock file and work root live under t.TempDir(),
// whose store is a fresh temp directory and whose clock is fixed to fixedNow.
// A zero Timeout defaults to five seconds so non-timeout tests cannot expire early.
func newRunner(t *testing.T, cfg Config, agent Agent) rig {
	t.Helper()
	dir := t.TempDir()
	cfg.LockPath = filepath.Join(dir, "world.lock")
	cfg.WorkRoot = filepath.Join(dir, "work")
	if cfg.Timeout == 0 {
		cfg.Timeout = 5 * time.Second
	}

	st := store.New(filepath.Join(t.TempDir(), "executions"))
	trees := &fakeTrees{}
	pub := &fakePublisher{}
	r := New(cfg, st, agent, trees, pub, func() time.Time { return fixedNow })
	return rig{r: r, cfg: cfg, st: st, trees: trees, pub: pub}
}

// TestRunLocked verifies that a run does not start when the World lock is already held.
// Given the lock file already exists,
// When Run is called,
// Then it returns an error wrapping lock.ErrLocked, the agent never runs and no worktree is created.
func TestRunLocked(t *testing.T) {
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
}

// TestRunCleanup verifies that a successful run releases the lock and removes its worktree.
// Given the agent succeeds,
// When Run completes,
// Then the lock file is gone, the worktree is created and removed exactly once under WorkRoot/EXEC-1,
// and the agent worked inside that same directory.
func TestRunCleanup(t *testing.T) {
	agent := &fakeAgent{cost: 0.5}
	h := newRunner(t, Config{}, agent)

	if _, err := h.r.Run(context.Background(), "EXEC-1", "ROUND-0000001"); err != nil {
		t.Fatalf("Run returned error: %v", err)
	}

	if _, err := os.Stat(h.cfg.LockPath); !errors.Is(err, fs.ErrNotExist) {
		t.Errorf("os.Stat(%q) error = %v; want fs.ErrNotExist", h.cfg.LockPath, err)
	}

	want := filepath.Join(h.cfg.WorkRoot, "EXEC-1")
	if len(h.trees.created) != 1 || h.trees.created[0] != want {
		t.Errorf("worktrees created = %v; want [%q]", h.trees.created, want)
	}
	if len(h.trees.removed) != 1 || h.trees.removed[0] != want {
		t.Errorf("worktrees removed = %v; want [%q]", h.trees.removed, want)
	}
	if agent.workDir != want {
		t.Errorf("agent workDir = %q; want %q", agent.workDir, want)
	}
}

// TestRunTimeout verifies that an agent exceeding the timeout fails the execution.
// Given the agent blocks until its context ends and the timeout is 20ms,
// When Run is called,
// Then it returns an error wrapping context.DeadlineExceeded and the stored record is FAILED.
func TestRunTimeout(t *testing.T) {
	agent := &fakeAgent{block: true}
	h := newRunner(t, Config{Timeout: 20 * time.Millisecond}, agent)

	_, err := h.r.Run(context.Background(), "EXEC-1", "ROUND-0000001")
	if !errors.Is(err, context.DeadlineExceeded) {
		t.Fatalf("Run error = %v; want errors.Is(err, context.DeadlineExceeded)", err)
	}

	got, gerr := h.st.Get("EXEC-1")
	if gerr != nil {
		t.Fatalf("store.Get(EXEC-1) returned error: %v", gerr)
	}
	if got.Status != store.StatusFailed {
		t.Errorf("stored status = %q; want %q", got.Status, store.StatusFailed)
	}
}
