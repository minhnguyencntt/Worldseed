package round

import (
	"context"
	"errors"
	"io/fs"
	"os"
	"path/filepath"
	"testing"
	"time"

	"gopkg.in/yaml.v3"

	"github.com/worldseed/storyforge/backend/internal/contribution"
)

// lifecycleNow is the fixed clock used by the lifecycle tests.
var lifecycleNow = time.Date(2026, 11, 23, 9, 0, 0, 0, time.UTC)

// fakeGit stands in for both gitrepo.Committer and gitrepo.Revisioner. It records the
// paths of every Commit call and reports a fixed HEAD.
type fakeGit struct {
	head    string
	commits [][]string
}

func (g *fakeGit) Commit(_ context.Context, paths []string, _ string) error {
	g.commits = append(g.commits, append([]string(nil), paths...))
	return nil
}

func (g *fakeGit) Head(_ context.Context) (string, error) {
	return g.head, nil
}

// committed reports whether any Commit call included the given repository-relative path.
func (g *fakeGit) committed(path string) bool {
	for _, call := range g.commits {
		for _, p := range call {
			if p == path {
				return true
			}
		}
	}
	return false
}

// stubContributions returns a fixed list of contributions for any round.
type stubContributions struct {
	list []contribution.Contribution
}

func (s stubContributions) ListByRound(_ context.Context, _, _ string) ([]contribution.Contribution, error) {
	return s.list, nil
}

// newLifecycleService builds a Service over a temporary Git root with two contributions
// in the round and a fake Git that reports HEAD "abc123".
func newLifecycleService(t *testing.T) (*Service, *fakeGit, string) {
	t.Helper()
	root := t.TempDir()
	git := &fakeGit{head: "abc123"}
	svc := &Service{
		Store:     &FileStore{Root: root},
		Committer: git,
		Revisions: git,
		Contributions: stubContributions{list: []contribution.Contribution{
			{ID: "CON-0000000000000000000000000000000a", WorldID: "w", RoundID: "ROUND-0000001", PlayerID: "player-a", Prompt: "first prompt", CreatedAt: lifecycleNow},
			{ID: "CON-0000000000000000000000000000000b", WorldID: "w", RoundID: "ROUND-0000001", PlayerID: "player-b", Prompt: "second prompt", CreatedAt: lifecycleNow.Add(time.Minute)},
		}},
		Now: func() time.Time { return lifecycleNow },
	}
	return svc, git, root
}

// snapshotPath returns the on-disk location of the snapshot of ROUND-0000001 in world w.
func snapshotPath(root string) string {
	return filepath.Join(root, "worlds", "w", "rounds", "round-0000001", SnapshotFile)
}

// TestOpen_SetsWindow: Open moves a SCHEDULED round to OPEN, starts it now, keeps its
// 24h length and stores the default base release.
func TestOpen_SetsWindow(t *testing.T) {
	svc, _, _ := newLifecycleService(t)
	ctx := context.Background()

	created, err := svc.Create(ctx, "w", lifecycleNow.Add(-time.Hour), 24*time.Hour, "")
	if err != nil {
		t.Fatalf("Create: %v", err)
	}
	if err := svc.Open(ctx, "w", created.ID, OpenOptions{}); err != nil {
		t.Fatalf("Open: %v", err)
	}

	got, err := svc.Get("w", created.ID)
	if err != nil {
		t.Fatalf("Get: %v", err)
	}
	if got.Status != StatusOpen {
		t.Errorf("Status = %s, want %s", got.Status, StatusOpen)
	}
	if !got.StartsAt.Equal(lifecycleNow) {
		t.Errorf("StartsAt = %s, want %s", got.StartsAt, lifecycleNow)
	}
	if want := got.StartsAt.Add(24 * time.Hour); !got.EndsAt.Equal(want) {
		t.Errorf("EndsAt = %s, want StartsAt+24h = %s", got.EndsAt, want)
	}
	if got.BaseRelease != "1.0.0" {
		t.Errorf("BaseRelease = %q, want %q", got.BaseRelease, "1.0.0")
	}
}

// TestClose_FreezesSnapshot: Close on an OPEN round writes a read-only snapshot of both
// contributions, commits it, records HEAD as FreezeCommit and moves the round to CLOSED.
func TestClose_FreezesSnapshot(t *testing.T) {
	svc, git, root := newLifecycleService(t)
	ctx := context.Background()

	created, err := svc.Create(ctx, "w", lifecycleNow, 24*time.Hour, "")
	if err != nil {
		t.Fatalf("Create: %v", err)
	}
	if err := svc.Open(ctx, "w", created.ID, OpenOptions{}); err != nil {
		t.Fatalf("Open: %v", err)
	}
	if err := svc.Close(ctx, "w", created.ID); err != nil {
		t.Fatalf("Close: %v", err)
	}

	info, err := os.Stat(snapshotPath(root))
	if err != nil {
		t.Fatalf("snapshot.yaml not written: %v", err)
	}
	if mode := info.Mode().Perm(); mode != 0o444 {
		t.Errorf("snapshot mode = %o, want 0444", mode)
	}

	data, err := os.ReadFile(snapshotPath(root))
	if err != nil {
		t.Fatalf("ReadFile snapshot: %v", err)
	}
	var snap Snapshot
	if err := yaml.Unmarshal(data, &snap); err != nil {
		t.Fatalf("decode snapshot: %v", err)
	}
	if len(snap.Contributions) != 2 {
		t.Errorf("snapshot entries = %d, want 2", len(snap.Contributions))
	}

	if !git.committed("worlds/w/rounds/round-0000001/snapshot.yaml") {
		t.Errorf("snapshot.yaml not committed; commits = %v", git.commits)
	}

	got, err := svc.Get("w", created.ID)
	if err != nil {
		t.Fatalf("Get: %v", err)
	}
	if got.FreezeCommit != "abc123" {
		t.Errorf("FreezeCommit = %q, want %q", got.FreezeCommit, "abc123")
	}
	if got.Status != StatusClosed {
		t.Errorf("Status = %s, want %s", got.Status, StatusClosed)
	}
	if got.ClosedAt == nil {
		t.Errorf("ClosedAt = nil, want set")
	}
}

// TestClose_RequiresOpen: Close on a SCHEDULED round returns ErrIllegalTransition and
// writes no snapshot; a second Close on a CLOSED round fails and leaves the snapshot bytes unchanged.
func TestClose_RequiresOpen(t *testing.T) {
	svc, _, root := newLifecycleService(t)
	ctx := context.Background()

	scheduled, err := svc.Create(ctx, "w", lifecycleNow, 24*time.Hour, "")
	if err != nil {
		t.Fatalf("Create: %v", err)
	}
	if err := svc.Close(ctx, "w", scheduled.ID); !errors.Is(err, ErrIllegalTransition) {
		t.Fatalf("Close on SCHEDULED error = %v, want ErrIllegalTransition", err)
	}
	if _, err := os.Stat(snapshotPath(root)); !errors.Is(err, fs.ErrNotExist) {
		t.Fatalf("snapshot.yaml exists after rejected Close (stat err = %v)", err)
	}

	// Move the same round through a valid freeze, then try to freeze it again.
	if err := svc.Open(ctx, "w", scheduled.ID, OpenOptions{}); err != nil {
		t.Fatalf("Open: %v", err)
	}
	if err := svc.Close(ctx, "w", scheduled.ID); err != nil {
		t.Fatalf("Close: %v", err)
	}
	before, err := os.ReadFile(snapshotPath(root))
	if err != nil {
		t.Fatalf("ReadFile snapshot: %v", err)
	}

	if err := svc.Close(ctx, "w", scheduled.ID); err == nil {
		t.Fatal("second Close error = nil, want error")
	}
	after, err := os.ReadFile(snapshotPath(root))
	if err != nil {
		t.Fatalf("ReadFile snapshot after second Close: %v", err)
	}
	if string(before) != string(after) {
		t.Errorf("snapshot bytes changed by second Close")
	}
}

// TestCreate_RejectsActiveRound: Create returns ErrActiveRound while an OPEN round exists in the world.
func TestCreate_RejectsActiveRound(t *testing.T) {
	svc, _, _ := newLifecycleService(t)
	ctx := context.Background()

	first, err := svc.Create(ctx, "w", lifecycleNow, 24*time.Hour, "")
	if err != nil {
		t.Fatalf("Create first: %v", err)
	}
	if err := svc.Open(ctx, "w", first.ID, OpenOptions{}); err != nil {
		t.Fatalf("Open: %v", err)
	}

	if _, err := svc.Create(ctx, "w", lifecycleNow.Add(48*time.Hour), 24*time.Hour, ""); !errors.Is(err, ErrActiveRound) {
		t.Fatalf("Create with OPEN round error = %v, want ErrActiveRound", err)
	}
}
