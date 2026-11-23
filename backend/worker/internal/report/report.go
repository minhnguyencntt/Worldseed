// Package report writes per-execution report files as JSON.
// Each report is written atomically: the payload goes to a temporary file in
// the target directory and is renamed over <dir>/<execution_id>.json.
package report

import (
	"encoding/json"
	"fmt"
	"os"
	"path/filepath"
	"time"

	"github.com/worldseed/storyforge/worker/internal/store"
)

// Report summarises one worker execution.
type Report struct {
	ExecutionID string       `json:"execution_id"`
	RoundID     string       `json:"round_id"`
	Status      store.Status `json:"status"`
	Attempts    int          `json:"attempts"`
	Error       string       `json:"error"`
	StartedAt   time.Time    `json:"started_at"`
	FinishedAt  time.Time    `json:"finished_at"`
	DurationMS  int64        `json:"duration_ms"`
}

// Writer writes reports as <dir>/<execution_id>.json.
type Writer struct {
	dir string
}

// New returns a Writer that keeps its reports in dir.
func New(dir string) *Writer {
	return &Writer{dir: dir}
}

// Write validates r.ExecutionID and atomically writes r as indented JSON.
// An invalid ID is rejected before anything touches the disk.
func (w *Writer) Write(r Report) error {
	if err := store.ValidateID(r.ExecutionID); err != nil {
		return err
	}
	if err := os.MkdirAll(w.dir, 0o755); err != nil {
		return fmt.Errorf("report: create dir: %w", err)
	}
	data, err := json.MarshalIndent(r, "", "  ")
	if err != nil {
		return fmt.Errorf("report: marshal %s: %w", r.ExecutionID, err)
	}
	tmp, err := os.CreateTemp(w.dir, ".tmp-*")
	if err != nil {
		return fmt.Errorf("report: create temp: %w", err)
	}
	tmpPath := tmp.Name()
	committed := false
	defer func() {
		if !committed {
			_ = os.Remove(tmpPath)
		}
	}()
	if _, err := tmp.Write(data); err != nil {
		_ = tmp.Close()
		return fmt.Errorf("report: write %s: %w", r.ExecutionID, err)
	}
	if err := tmp.Close(); err != nil {
		return fmt.Errorf("report: close %s: %w", r.ExecutionID, err)
	}
	if err := os.Rename(tmpPath, filepath.Join(w.dir, r.ExecutionID+".json")); err != nil {
		return fmt.Errorf("report: rename %s: %w", r.ExecutionID, err)
	}
	committed = true
	return nil
}
