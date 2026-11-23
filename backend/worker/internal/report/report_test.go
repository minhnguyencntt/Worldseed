package report

import (
	"encoding/json"
	"errors"
	"os"
	"path/filepath"
	"testing"
	"time"

	"github.com/worldseed/storyforge/worker/internal/store"
)

// Given a report writer backed by a temp directory,
// when a valid report is written,
// then <execution_id>.json holds every field of the report.
func TestWriteRoundTrip(t *testing.T) {
	dir := filepath.Join(t.TempDir(), "executions")
	w := New(dir)

	started := time.Date(2026, 11, 23, 10, 0, 0, 0, time.UTC)
	finished := started.Add(1500 * time.Millisecond)
	want := Report{
		ExecutionID: "exec-1",
		RoundID:     "ROUND-0000001",
		Status:      store.StatusFailed,
		Attempts:    2,
		Error:       "boom",
		StartedAt:   started,
		FinishedAt:  finished,
		DurationMS:  1500,
	}

	if err := w.Write(want); err != nil {
		t.Fatalf("Write: unexpected error: %v", err)
	}

	data, err := os.ReadFile(filepath.Join(dir, "exec-1.json"))
	if err != nil {
		t.Fatalf("read exec-1.json: %v", err)
	}
	var got Report
	if err := json.Unmarshal(data, &got); err != nil {
		t.Fatalf("unmarshal exec-1.json: %v", err)
	}

	if got.ExecutionID != want.ExecutionID {
		t.Errorf("ExecutionID = %q, want %q", got.ExecutionID, want.ExecutionID)
	}
	if got.RoundID != want.RoundID {
		t.Errorf("RoundID = %q, want %q", got.RoundID, want.RoundID)
	}
	if got.Status != want.Status {
		t.Errorf("Status = %q, want %q", got.Status, want.Status)
	}
	if got.Attempts != want.Attempts {
		t.Errorf("Attempts = %d, want %d", got.Attempts, want.Attempts)
	}
	if got.Error != want.Error {
		t.Errorf("Error = %q, want %q", got.Error, want.Error)
	}
	if !got.StartedAt.Equal(want.StartedAt) {
		t.Errorf("StartedAt = %v, want %v", got.StartedAt, want.StartedAt)
	}
	if !got.FinishedAt.Equal(want.FinishedAt) {
		t.Errorf("FinishedAt = %v, want %v", got.FinishedAt, want.FinishedAt)
	}
	if got.DurationMS != want.DurationMS {
		t.Errorf("DurationMS = %d, want %d", got.DurationMS, want.DurationMS)
	}
}

// Given a report writer and an execution ID that is unsafe as a file name,
// when Write is called with that ID,
// then it returns ErrInvalidID and leaves no JSON file in the directory or its parent.
func TestWriteInvalidID(t *testing.T) {
	base := t.TempDir()
	dir := filepath.Join(base, "executions")
	if err := os.MkdirAll(dir, 0o755); err != nil {
		t.Fatalf("mkdir: %v", err)
	}
	w := New(dir)

	err := w.Write(Report{ExecutionID: "../evil", RoundID: "ROUND-0000001", Status: store.StatusFailed})
	if !errors.Is(err, store.ErrInvalidID) {
		t.Fatalf("Write error = %v, want errors.Is(err, store.ErrInvalidID)", err)
	}

	assertNoJSON(t, dir)
	assertNoJSON(t, base)
}

func assertNoJSON(t *testing.T, path string) {
	t.Helper()
	entries, err := os.ReadDir(path)
	if err != nil {
		t.Fatalf("read dir %s: %v", path, err)
	}
	for _, e := range entries {
		if filepath.Ext(e.Name()) == ".json" {
			t.Errorf("unexpected json file %s in %s", e.Name(), path)
		}
	}
}
