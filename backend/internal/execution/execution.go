// Package execution stores worker execution records as YAML files under
// development/executions in the GitOps repository and commits every status
// transition through Git.
package execution

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

	"gopkg.in/yaml.v3"

	"github.com/worldseed/storyforge/backend/internal/gitrepo"
	"github.com/worldseed/storyforge/backend/internal/safepath"
)

// Status is the lifecycle state of one worker execution.
type Status string

const (
	StatusQueued           Status = "QUEUED"
	StatusRunning          Status = "RUNNING"
	StatusAwaitingApproval Status = "AWAITING_APPROVAL"
	StatusApproved         Status = "APPROVED"
	StatusFailed           Status = "FAILED"
	StatusCompleted        Status = "COMPLETED"
)

var (
	// ErrNotFound is returned when no execution file has the requested ID.
	ErrNotFound = errors.New("execution: not found")
	// ErrIllegalState is returned when the execution is not in a status that allows the transition.
	ErrIllegalState = errors.New("execution: illegal state")
)

// executionsDir is the repository-relative directory holding one YAML file per execution.
var executionsDir = filepath.Join("development", "executions")

// Execution is one worker run tied to a World and Round.
type Execution struct {
	ID        string    `yaml:"id" json:"id"`
	WorldID   string    `yaml:"world_id" json:"world_id"`
	RoundID   string    `yaml:"round_id" json:"round_id"`
	Status    Status    `yaml:"status" json:"status"`
	Error     string    `yaml:"error" json:"error"`
	UpdatedAt time.Time `yaml:"updated_at" json:"updated_at"`
}

// FileStore reads and transitions execution files under Root and commits each change
// through Git. Root is the GitOps repository root.
type FileStore struct {
	Root string
	Git  gitrepo.Committer
	Now  func() time.Time

	mu sync.Mutex
}

// List returns every execution under development/executions, sorted by ID.
// A missing directory yields an empty, non-nil slice.
func (s *FileStore) List(_ context.Context) ([]Execution, error) {
	dir := filepath.Join(s.Root, executionsDir)
	entries, err := os.ReadDir(dir)
	if errors.Is(err, fs.ErrNotExist) {
		return []Execution{}, nil
	}
	if err != nil {
		return nil, fmt.Errorf("execution: list: %w", err)
	}

	out := []Execution{}
	for _, e := range entries {
		if e.IsDir() || !strings.HasSuffix(e.Name(), ".yaml") {
			continue
		}
		ex, _, err := s.read(filepath.Join(dir, e.Name()))
		if err != nil {
			return nil, err
		}
		out = append(out, ex)
	}
	sort.SliceStable(out, func(i, j int) bool { return out[i].ID < out[j].ID })
	return out, nil
}

// Get returns the execution with the given ID. Unsafe IDs are reported as ErrNotFound.
func (s *FileStore) Get(_ context.Context, id string) (Execution, error) {
	if err := safepath.Segment(id); err != nil {
		return Execution{}, fmt.Errorf("%w: id: %w", ErrNotFound, err)
	}
	ex, _, err := s.read(s.path(id))
	return ex, err
}

// Retry moves a FAILED execution back to QUEUED and clears its error.
func (s *FileStore) Retry(ctx context.Context, id string) (Execution, error) {
	return s.transition(ctx, id, StatusFailed, StatusQueued, func(ex *Execution) {
		ex.Error = ""
	})
}

// Approve moves an AWAITING_APPROVAL execution to APPROVED.
func (s *FileStore) Approve(ctx context.Context, id string) (Execution, error) {
	return s.transition(ctx, id, StatusAwaitingApproval, StatusApproved, nil)
}

// transition checks the current status, applies the change, writes the file atomically
// and commits it. If the commit fails the previous file contents are restored.
func (s *FileStore) transition(ctx context.Context, id string, from, to Status, apply func(*Execution)) (Execution, error) {
	if err := safepath.Segment(id); err != nil {
		return Execution{}, fmt.Errorf("%w: id: %w", ErrNotFound, err)
	}
	if s.Git == nil {
		return Execution{}, errors.New("execution: no git committer configured")
	}

	s.mu.Lock()
	defer s.mu.Unlock()

	absPath := s.path(id)
	ex, prev, err := s.read(absPath)
	if err != nil {
		return Execution{}, err
	}
	if ex.Status != from {
		return Execution{}, fmt.Errorf("%w: status is %s, want %s", ErrIllegalState, ex.Status, from)
	}

	ex.Status = to
	ex.UpdatedAt = s.now()
	if apply != nil {
		apply(&ex)
	}

	data, err := yaml.Marshal(ex)
	if err != nil {
		return Execution{}, fmt.Errorf("execution: marshal: %w", err)
	}
	if err := writeAtomic(absPath, data); err != nil {
		return Execution{}, err
	}

	relPath := filepath.ToSlash(filepath.Join(executionsDir, id+".yaml"))
	if err := s.Git.Commit(ctx, []string{relPath}, fmt.Sprintf("execution %s: %s -> %s", id, from, to)); err != nil {
		// Restore the previous contents so the working tree matches the last commit.
		if rerr := writeAtomic(absPath, prev); rerr != nil {
			return Execution{}, fmt.Errorf("execution: commit: %w (restore: %v)", err, rerr)
		}
		return Execution{}, fmt.Errorf("execution: commit: %w", err)
	}
	return ex, nil
}

// path returns the absolute path of the execution file for id. id must be a safe segment.
func (s *FileStore) path(id string) string {
	return filepath.Join(s.Root, executionsDir, id+".yaml")
}

// read decodes the execution file at path and returns its raw bytes too.
// A missing file is reported as ErrNotFound.
func (s *FileStore) read(path string) (Execution, []byte, error) {
	raw, err := os.ReadFile(path)
	if errors.Is(err, fs.ErrNotExist) {
		return Execution{}, nil, ErrNotFound
	}
	if err != nil {
		return Execution{}, nil, fmt.Errorf("execution: read: %w", err)
	}
	var ex Execution
	if err := yaml.Unmarshal(raw, &ex); err != nil {
		return Execution{}, nil, fmt.Errorf("execution: decode %s: %w", filepath.Base(path), err)
	}
	return ex, raw, nil
}

func (s *FileStore) now() time.Time {
	if s.Now == nil {
		return time.Now().UTC()
	}
	return s.Now().UTC()
}

// writeAtomic replaces path with data via a temporary file in the same directory and a rename.
func writeAtomic(path string, data []byte) error {
	dir := filepath.Dir(path)
	if err := os.MkdirAll(dir, 0o755); err != nil {
		return fmt.Errorf("execution: create dir: %w", err)
	}
	tmp, err := os.CreateTemp(dir, ".execution-*.tmp")
	if err != nil {
		return fmt.Errorf("execution: create temp: %w", err)
	}
	tmpName := tmp.Name()
	if _, err := tmp.Write(data); err != nil {
		tmp.Close()
		os.Remove(tmpName)
		return fmt.Errorf("execution: write temp: %w", err)
	}
	if err := tmp.Close(); err != nil {
		os.Remove(tmpName)
		return fmt.Errorf("execution: close temp: %w", err)
	}
	if err := os.Chmod(tmpName, 0o644); err != nil {
		os.Remove(tmpName)
		return fmt.Errorf("execution: chmod temp: %w", err)
	}
	if err := os.Rename(tmpName, path); err != nil {
		os.Remove(tmpName)
		return fmt.Errorf("execution: rename: %w", err)
	}
	return nil
}
