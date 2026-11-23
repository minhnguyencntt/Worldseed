package store

import (
	"errors"
	"os"
	"path/filepath"
	"testing"
	"time"
)

// TestSaveGet_RoundTrip verifies that an execution saved to the store is read
// back with every field intact, including the timestamps.
func TestSaveGet_RoundTrip(t *testing.T) {
	s := New(filepath.Join(t.TempDir(), "executions"))
	created := time.Date(2026, 1, 2, 3, 4, 5, 0, time.UTC)
	updated := time.Date(2026, 1, 2, 3, 5, 6, 0, time.UTC)
	want := Execution{
		ID:        "EXEC-1",
		RoundID:   "ROUND-0000001",
		Status:    StatusPending,
		Attempt:   1,
		CreatedAt: created,
		UpdatedAt: updated,
	}

	if err := s.Save(want); err != nil {
		t.Fatalf("Save(%q) returned error: %v", want.ID, err)
	}
	got, err := s.Get("EXEC-1")
	if err != nil {
		t.Fatalf("Get(%q) returned error: %v", "EXEC-1", err)
	}

	if got.ID != want.ID || got.RoundID != want.RoundID || got.Status != want.Status ||
		got.Attempt != want.Attempt || got.Error != want.Error {
		t.Fatalf("Get(%q) = %+v; want %+v", "EXEC-1", got, want)
	}
	if !got.CreatedAt.Equal(want.CreatedAt) {
		t.Fatalf("CreatedAt = %v; want %v", got.CreatedAt, want.CreatedAt)
	}
	if !got.UpdatedAt.Equal(want.UpdatedAt) {
		t.Fatalf("UpdatedAt = %v; want %v", got.UpdatedAt, want.UpdatedAt)
	}
}

// TestList_Sorted verifies that List returns every saved execution ordered by
// ID, and that listing an empty or missing directory yields no items and no error.
func TestList_Sorted(t *testing.T) {
	t.Run("returns IDs in ascending order", func(t *testing.T) {
		s := New(filepath.Join(t.TempDir(), "executions"))
		for _, id := range []string{"EXEC-3", "EXEC-1", "EXEC-2"} {
			if err := s.Save(Execution{ID: id, RoundID: "ROUND-0000001", Status: StatusPending, Attempt: 1}); err != nil {
				t.Fatalf("Save(%q) returned error: %v", id, err)
			}
		}

		items, err := s.List()
		if err != nil {
			t.Fatalf("List() returned error: %v", err)
		}
		want := []string{"EXEC-1", "EXEC-2", "EXEC-3"}
		if len(items) != len(want) {
			t.Fatalf("List() returned %d items; want %d", len(items), len(want))
		}
		for i, id := range want {
			if items[i].ID != id {
				t.Fatalf("List()[%d].ID = %q; want %q", i, items[i].ID, id)
			}
		}
	})

	t.Run("returns zero items and nil error for a fresh empty directory", func(t *testing.T) {
		s := New(filepath.Join(t.TempDir(), "executions"))

		items, err := s.List()
		if err != nil {
			t.Fatalf("List() on empty dir returned error: %v", err)
		}
		if len(items) != 0 {
			t.Fatalf("List() on empty dir returned %d items; want 0", len(items))
		}
	})
}

// TestInvalidIDAndNotFound verifies that unsafe IDs are rejected by Save and Get
// without writing anything outside the store directory, and that a well-formed
// but unknown ID reports ErrNotFound.
func TestInvalidIDAndNotFound(t *testing.T) {
	base := t.TempDir()
	s := New(filepath.Join(base, "executions"))

	err := s.Save(Execution{ID: "../evil", RoundID: "ROUND-0000001", Status: StatusPending, Attempt: 1})
	if !errors.Is(err, ErrInvalidID) {
		t.Fatalf("Save(%q) error = %v; want errors.Is(err, ErrInvalidID)", "../evil", err)
	}
	if _, err := s.Get("../evil"); !errors.Is(err, ErrInvalidID) {
		t.Fatalf("Get(%q) error = %v; want errors.Is(err, ErrInvalidID)", "../evil", err)
	}

	entries, err := os.ReadDir(base)
	if err != nil {
		t.Fatalf("ReadDir(%q) returned error: %v", base, err)
	}
	for _, entry := range entries {
		if entry.Name() != "executions" {
			t.Fatalf("unexpected entry %q in parent of store dir; invalid ID must not write outside the store", entry.Name())
		}
	}

	if _, err := s.Get("EXEC-404"); !errors.Is(err, ErrNotFound) {
		t.Fatalf("Get(%q) error = %v; want errors.Is(err, ErrNotFound)", "EXEC-404", err)
	}
}

// TestValidateID verifies that ValidateID accepts file-name-safe execution IDs
// and rejects empty, path-like, or dot-prefixed IDs with ErrInvalidID.
func TestValidateID(t *testing.T) {
	invalid := []string{"", "../evil", "a/b", ".hidden"}
	for _, id := range invalid {
		t.Run("rejects "+id, func(t *testing.T) {
			err := ValidateID(id)
			if !errors.Is(err, ErrInvalidID) {
				t.Fatalf("ValidateID(%q) error = %v; want errors.Is(err, ErrInvalidID)", id, err)
			}
		})
	}

	valid := []string{"exec-1.2", "EXEC_1"}
	for _, id := range valid {
		t.Run("accepts "+id, func(t *testing.T) {
			if err := ValidateID(id); err != nil {
				t.Fatalf("ValidateID(%q) returned error: %v; want nil", id, err)
			}
		})
	}
}
