package contribution

import (
	"context"
	"errors"
	"fmt"
	"os"
	"path/filepath"
	"sync"
	"testing"
	"time"

	"github.com/worldseed/storyforge/backend/internal/safepath"
)

// fakeCommitter records every Commit call instead of running git. It is safe for
// concurrent use so it can stand in for the real Git CLI in parallel Save tests.
type fakeCommitter struct {
	mu    sync.Mutex
	calls [][]string
}

func (f *fakeCommitter) Commit(_ context.Context, paths []string, _ string) error {
	f.mu.Lock()
	defer f.mu.Unlock()
	f.calls = append(f.calls, append([]string(nil), paths...))
	return nil
}

func (f *fakeCommitter) count() int {
	f.mu.Lock()
	defer f.mu.Unlock()
	return len(f.calls)
}

// Given 50 concurrent submissions with distinct prompts in one Round,
// When each one is saved through FileStore,
// Then every contribution gets its own Markdown file and its own commit.
func TestSave_ConcurrentDistinctFiles(t *testing.T) {
	root := t.TempDir()
	git := &fakeCommitter{}
	store := &FileStore{Root: root, Git: git}

	const n = 50
	var wg sync.WaitGroup
	errs := make(chan error, n)
	for i := 0; i < n; i++ {
		wg.Add(1)
		go func(i int) {
			defer wg.Done()
			_, err := store.Save(context.Background(), Contribution{
				WorldID:  "the-boys-room",
				RoundID:  "round-0000001",
				PlayerID: fmt.Sprintf("player-%02d", i),
				Prompt:   fmt.Sprintf("prompt %d", i),
			})
			if err != nil {
				errs <- err
			}
		}(i)
	}
	wg.Wait()
	close(errs)
	for err := range errs {
		t.Errorf("Save: %v", err)
	}

	dir := filepath.Join(root, "worlds", "the-boys-room", "rounds", "round-0000001", "contributions")
	entries, err := os.ReadDir(dir)
	if err != nil {
		t.Fatalf("ReadDir(%s): %v", dir, err)
	}
	seen := map[string]bool{}
	for _, e := range entries {
		if e.IsDir() || filepath.Ext(e.Name()) != ".md" {
			continue
		}
		if seen[e.Name()] {
			t.Errorf("duplicate file name %s", e.Name())
		}
		seen[e.Name()] = true
	}
	if len(seen) != n {
		t.Errorf("markdown files = %d, want %d", len(seen), n)
	}
	if got := git.count(); got != n {
		t.Errorf("commits = %d, want %d", got, n)
	}
}

// Given a contribution already saved with a preset ID,
// When a second contribution with the same ID is saved,
// Then Save returns ErrExists and the original file content is unchanged.
func TestSave_NoOverwrite(t *testing.T) {
	root := t.TempDir()
	git := &fakeCommitter{}
	store := &FileStore{Root: root, Git: git}

	first := Contribution{
		ID:       "CON-0000000000000000000000000000000a",
		WorldID:  "the-boys-room",
		RoundID:  "round-0000001",
		PlayerID: "player-1",
		Prompt:   "the first prompt",
	}
	if _, err := store.Save(context.Background(), first); err != nil {
		t.Fatalf("first Save: %v", err)
	}

	second := first
	second.Prompt = "the second prompt"
	_, err := store.Save(context.Background(), second)
	if !errors.Is(err, ErrExists) {
		t.Fatalf("second Save error = %v, want ErrExists", err)
	}

	path := filepath.Join(root, "worlds", "the-boys-room", "rounds", "round-0000001", "contributions", first.ID+".md")
	data, err := os.ReadFile(path)
	if err != nil {
		t.Fatalf("ReadFile: %v", err)
	}
	got, err := parse(data)
	if err != nil {
		t.Fatalf("parse: %v", err)
	}
	if got.Prompt != first.Prompt {
		t.Errorf("file prompt = %q, want %q", got.Prompt, first.Prompt)
	}
	if n := git.count(); n != 1 {
		t.Errorf("commits = %d, want 1", n)
	}
}

// Given world or round IDs that are path traversal or nested paths,
// When Save is called,
// Then it returns safepath.ErrUnsafe and writes nothing under the root.
func TestSave_TraversalRejected(t *testing.T) {
	cases := []struct {
		name  string
		world string
		round string
	}{
		{name: "world traversal", world: "../x", round: "round-0000001"},
		{name: "round nested path", world: "the-boys-room", round: "a/b"},
	}
	for _, tc := range cases {
		t.Run(tc.name, func(t *testing.T) {
			root := t.TempDir()
			git := &fakeCommitter{}
			store := &FileStore{Root: root, Git: git}

			_, err := store.Save(context.Background(), Contribution{
				WorldID:  tc.world,
				RoundID:  tc.round,
				PlayerID: "player-1",
				Prompt:   "malicious",
			})
			if !errors.Is(err, safepath.ErrUnsafe) {
				t.Fatalf("Save error = %v, want safepath.ErrUnsafe", err)
			}
			entries, err := os.ReadDir(root)
			if err != nil {
				t.Fatalf("ReadDir(root): %v", err)
			}
			if len(entries) != 0 {
				t.Errorf("temp dir not empty after rejected save: %d entries", len(entries))
			}
			if n := git.count(); n != 0 {
				t.Errorf("commits = %d, want 0", n)
			}
		})
	}
}

// Given two contributions from different players in the same Round,
// When each is saved and read back,
// Then Get returns every stored field and ListByPlayer returns only the matching player's contribution.
func TestGetAndListByPlayer(t *testing.T) {
	root := t.TempDir()
	git := &fakeCommitter{}
	store := &FileStore{Root: root, Git: git}
	ctx := context.Background()

	createdA := time.Date(2026, 11, 23, 10, 0, 0, 0, time.UTC)
	createdB := time.Date(2026, 11, 23, 10, 5, 0, 0, time.UTC)

	a, err := store.Save(ctx, Contribution{
		ID:        "CON-0000000000000000000000000000000a",
		WorldID:   "the-boys-room",
		RoundID:   "round-0000001",
		PlayerID:  "player-a",
		Prompt:    "prompt from player a",
		CreatedAt: createdA,
	})
	if err != nil {
		t.Fatalf("Save a: %v", err)
	}
	if _, err := store.Save(ctx, Contribution{
		ID:        "CON-0000000000000000000000000000000b",
		WorldID:   "the-boys-room",
		RoundID:   "round-0000001",
		PlayerID:  "player-b",
		Prompt:    "prompt from player b",
		CreatedAt: createdB,
	}); err != nil {
		t.Fatalf("Save b: %v", err)
	}

	got, err := store.Get(ctx, a.ID)
	if err != nil {
		t.Fatalf("Get: %v", err)
	}
	if got.ID != a.ID || got.WorldID != "the-boys-room" || got.RoundID != "round-0000001" ||
		got.PlayerID != "player-a" || got.Prompt != "prompt from player a" || !got.CreatedAt.Equal(createdA) {
		t.Errorf("Get = %+v, want fields of %+v", got, a)
	}

	list, err := store.ListByPlayer(ctx, "round-0000001", "player-a")
	if err != nil {
		t.Fatalf("ListByPlayer: %v", err)
	}
	if len(list) != 1 {
		t.Fatalf("ListByPlayer returned %d entries, want 1", len(list))
	}
	if list[0].ID != a.ID || list[0].PlayerID != "player-a" {
		t.Errorf("ListByPlayer[0] = %+v, want player-a contribution %s", list[0], a.ID)
	}
}
