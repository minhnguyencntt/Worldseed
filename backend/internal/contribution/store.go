package contribution

import (
	"context"
	"errors"
	"fmt"
	"io/fs"
	"os"
	"path/filepath"
	"sort"
	"strings"
	"sync"
	"time"

	"github.com/worldseed/storyforge/backend/internal/gitrepo"
	"github.com/worldseed/storyforge/backend/internal/safepath"
)

var (
	// ErrExists is returned by Save when a contribution file with the same ID already exists.
	ErrExists = errors.New("contribution: already exists")
	// ErrNotFound is returned by Get when no contribution file has the requested ID.
	ErrNotFound = errors.New("contribution: not found")
)

// Store persists immutable contributions and answers per-player queries within a Round.
type Store interface {
	Save(ctx context.Context, c Contribution) (Contribution, error)
	Get(ctx context.Context, id string) (Contribution, error)
	ListByPlayer(ctx context.Context, roundID, playerID string) ([]Contribution, error)
	CountByPlayer(ctx context.Context, roundID, playerID string) (int, error)
	HasPrompt(ctx context.Context, roundID, playerID, prompt string) (bool, error)
}

// FileStore keeps contributions as Markdown files under Root and commits each one
// through Git. Root is the GitOps repository root.
type FileStore struct {
	Root string
	Git  gitrepo.Committer

	mu sync.Mutex
}

var _ Store = (*FileStore)(nil)

// Save writes c as a new immutable file and commits it. If c.ID is empty a new ID is
// generated. World and round IDs, and any supplied ID, must be safe path segments.
// Save never overwrites an existing file.
func (s *FileStore) Save(ctx context.Context, c Contribution) (Contribution, error) {
	if err := safepath.Segment(c.WorldID); err != nil {
		return Contribution{}, fmt.Errorf("contribution: world id: %w", err)
	}
	if err := safepath.Segment(c.RoundID); err != nil {
		return Contribution{}, fmt.Errorf("contribution: round id: %w", err)
	}
	if c.ID == "" {
		id, err := NewID()
		if err != nil {
			return Contribution{}, err
		}
		c.ID = id
	} else if err := safepath.Segment(c.ID); err != nil {
		return Contribution{}, fmt.Errorf("contribution: id: %w", err)
	}
	if c.CreatedAt.IsZero() {
		c.CreatedAt = time.Now().UTC().Truncate(time.Second)
	}
	if s.Git == nil {
		return Contribution{}, errors.New("contribution: no git committer configured")
	}

	data, err := render(c)
	if err != nil {
		return Contribution{}, err
	}

	s.mu.Lock()
	defer s.mu.Unlock()

	relPath := filepath.Join(contributionsDir(c.WorldID, c.RoundID), c.ID+".md")
	absPath := filepath.Join(s.Root, relPath)
	if err := os.MkdirAll(filepath.Dir(absPath), 0o755); err != nil {
		return Contribution{}, fmt.Errorf("contribution: create dir: %w", err)
	}

	f, err := os.OpenFile(absPath, os.O_CREATE|os.O_EXCL|os.O_WRONLY, 0o644)
	if err != nil {
		if errors.Is(err, fs.ErrExist) {
			return Contribution{}, ErrExists
		}
		return Contribution{}, fmt.Errorf("contribution: create file: %w", err)
	}
	if _, err := f.Write(data); err != nil {
		f.Close()
		os.Remove(absPath)
		return Contribution{}, fmt.Errorf("contribution: write file: %w", err)
	}
	if err := f.Close(); err != nil {
		os.Remove(absPath)
		return Contribution{}, fmt.Errorf("contribution: close file: %w", err)
	}

	if err := s.Git.Commit(ctx, []string{filepath.ToSlash(relPath)}, "contribution "+c.ID); err != nil {
		// Do not leave an uncommitted file behind; the caller may retry with a new ID.
		os.Remove(absPath)
		return Contribution{}, fmt.Errorf("contribution: commit: %w", err)
	}
	return c, nil
}

// Get returns the contribution with the given ID, searching every world and round.
func (s *FileStore) Get(_ context.Context, id string) (Contribution, error) {
	if err := safepath.Segment(id); err != nil {
		return Contribution{}, fmt.Errorf("contribution: id: %w", err)
	}
	matches, err := filepath.Glob(filepath.Join(s.Root, "worlds", "*", "rounds", "*", "contributions", id+".md"))
	if err != nil {
		return Contribution{}, fmt.Errorf("contribution: glob: %w", err)
	}
	if len(matches) == 0 {
		return Contribution{}, ErrNotFound
	}
	return readFile(matches[0])
}

// ListByPlayer returns the player's contributions in the given round, oldest first.
func (s *FileStore) ListByPlayer(_ context.Context, roundID, playerID string) ([]Contribution, error) {
	if err := safepath.Segment(roundID); err != nil {
		return nil, fmt.Errorf("contribution: round id: %w", err)
	}
	matches, err := filepath.Glob(filepath.Join(s.Root, "worlds", "*", "rounds", strings.ToLower(roundID), "contributions", "*.md"))
	if err != nil {
		return nil, fmt.Errorf("contribution: glob: %w", err)
	}

	var out []Contribution
	for _, m := range matches {
		c, err := readFile(m)
		if err != nil {
			return nil, err
		}
		if c.PlayerID == playerID {
			out = append(out, c)
		}
	}
	sort.SliceStable(out, func(i, j int) bool { return out[i].CreatedAt.Before(out[j].CreatedAt) })
	return out, nil
}

// CountByPlayer returns how many contributions the player has in the given round.
func (s *FileStore) CountByPlayer(ctx context.Context, roundID, playerID string) (int, error) {
	list, err := s.ListByPlayer(ctx, roundID, playerID)
	if err != nil {
		return 0, err
	}
	return len(list), nil
}

// HasPrompt reports whether the player already submitted exactly this prompt in the given round.
func (s *FileStore) HasPrompt(ctx context.Context, roundID, playerID, prompt string) (bool, error) {
	list, err := s.ListByPlayer(ctx, roundID, playerID)
	if err != nil {
		return false, err
	}
	for _, c := range list {
		if c.Prompt == prompt {
			return true, nil
		}
	}
	return false, nil
}

func contributionsDir(worldID, roundID string) string {
	return filepath.Join("worlds", worldID, "rounds", strings.ToLower(roundID), "contributions")
}

func readFile(path string) (Contribution, error) {
	data, err := os.ReadFile(path)
	if err != nil {
		return Contribution{}, fmt.Errorf("contribution: read %s: %w", filepath.Base(path), err)
	}
	return parse(data)
}
