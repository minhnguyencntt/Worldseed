// Package store persists worker execution records as one JSON file per execution.
// Writes are atomic: each record is written to a temporary file in the same
// directory and renamed over the final path.
package store

import (
	"encoding/json"
	"errors"
	"fmt"
	"io/fs"
	"os"
	"path/filepath"
	"regexp"
	"sort"
	"strings"
	"time"
)

// Status is the lifecycle state of one worker execution.
type Status string

const (
	StatusPending          Status = "PENDING"
	StatusRunning          Status = "RUNNING"
	StatusAwaitingApproval Status = "AWAITING_APPROVAL"
	StatusCompleted        Status = "COMPLETED"
	StatusFailed           Status = "FAILED"
)

var (
	// ErrInvalidID is returned when an execution ID is empty, unsafe as a file name, or contains "..".
	ErrInvalidID = errors.New("store: invalid execution id")
	// ErrNotFound is returned when no record file exists for the requested ID.
	ErrNotFound = errors.New("store: execution not found")
)

// idPattern allows only file-name-safe characters and must start with an alphanumeric.
var idPattern = regexp.MustCompile(`^[A-Za-z0-9][A-Za-z0-9._-]*$`)

// Execution is one worker run tied to a Round.
type Execution struct {
	ID        string    `json:"id"`
	RoundID   string    `json:"round_id"`
	Status    Status    `json:"status"`
	Attempt   int       `json:"attempt"`
	Error     string    `json:"error"`
	CreatedAt time.Time `json:"created_at"`
	UpdatedAt time.Time `json:"updated_at"`
}

// Store reads and writes execution records as <dir>/<id>.json.
type Store struct {
	dir string
}

// New returns a Store that keeps its records in dir.
func New(dir string) *Store {
	return &Store{dir: dir}
}

// validateID rejects IDs that are not safe to use as a file name inside the store directory.
func validateID(id string) error {
	if !idPattern.MatchString(id) || strings.Contains(id, "..") {
		return fmt.Errorf("%w: %q", ErrInvalidID, id)
	}
	return nil
}

// Save atomically writes e to <dir>/<e.ID>.json, replacing any previous record.
func (s *Store) Save(e Execution) error {
	if err := validateID(e.ID); err != nil {
		return err
	}
	if err := os.MkdirAll(s.dir, 0o755); err != nil {
		return fmt.Errorf("store: create dir: %w", err)
	}
	data, err := json.MarshalIndent(e, "", "  ")
	if err != nil {
		return fmt.Errorf("store: marshal %s: %w", e.ID, err)
	}

	tmp, err := os.CreateTemp(s.dir, ".tmp-*")
	if err != nil {
		return fmt.Errorf("store: create temp file: %w", err)
	}
	tmpName := tmp.Name()
	committed := false
	defer func() {
		if !committed {
			_ = os.Remove(tmpName)
		}
	}()

	if _, err := tmp.Write(data); err != nil {
		_ = tmp.Close()
		return fmt.Errorf("store: write %s: %w", e.ID, err)
	}
	if err := tmp.Close(); err != nil {
		return fmt.Errorf("store: close %s: %w", e.ID, err)
	}
	if err := os.Rename(tmpName, s.path(e.ID)); err != nil {
		return fmt.Errorf("store: rename %s: %w", e.ID, err)
	}
	committed = true
	return nil
}

// Get returns the execution with the given ID.
func (s *Store) Get(id string) (Execution, error) {
	if err := validateID(id); err != nil {
		return Execution{}, err
	}
	data, err := os.ReadFile(s.path(id))
	if errors.Is(err, fs.ErrNotExist) {
		return Execution{}, fmt.Errorf("%w: %s", ErrNotFound, id)
	}
	if err != nil {
		return Execution{}, fmt.Errorf("store: read %s: %w", id, err)
	}
	var e Execution
	if err := json.Unmarshal(data, &e); err != nil {
		return Execution{}, fmt.Errorf("store: decode %s: %w", id, err)
	}
	return e, nil
}

// List returns every stored execution sorted by ID. A missing directory yields an empty, non-nil slice.
func (s *Store) List() ([]Execution, error) {
	entries, err := os.ReadDir(s.dir)
	if errors.Is(err, fs.ErrNotExist) {
		return []Execution{}, nil
	}
	if err != nil {
		return nil, fmt.Errorf("store: list: %w", err)
	}

	out := make([]Execution, 0, len(entries))
	for _, entry := range entries {
		if entry.IsDir() || !strings.HasSuffix(entry.Name(), ".json") {
			continue
		}
		e, err := s.Get(strings.TrimSuffix(entry.Name(), ".json"))
		if err != nil {
			return nil, err
		}
		out = append(out, e)
	}
	sort.Slice(out, func(i, j int) bool { return out[i].ID < out[j].ID })
	return out, nil
}

func (s *Store) path(id string) string {
	return filepath.Join(s.dir, id+".json")
}
