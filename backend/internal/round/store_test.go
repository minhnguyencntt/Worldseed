package round

import (
	"os"
	"path/filepath"
	"testing"
)

// Given a valid Round saved into an empty GitOps root,
// When it is saved and read back with Get,
// Then round.yaml exists at worlds/<world>/rounds/<round>/round.yaml and the fields round-trip.
// Given a Round whose WorldID is a path traversal value,
// When Save and Get are called with it,
// Then both return an error and no file is created under the root.
func TestFileStore_RoundTrip(t *testing.T) {
	root := t.TempDir()
	s := &FileStore{Root: root}
	in := Round{
		ID:          "ROUND-0000001",
		WorldID:     "the-boys-room",
		Number:      1,
		Status:      StatusOpen,
		BaseRelease: "1.0.0",
	}

	if err := s.Save(in); err != nil {
		t.Fatalf("Save: %v", err)
	}

	path := filepath.Join(root, "worlds", "the-boys-room", "rounds", "round-0000001", "round.yaml")
	if _, err := os.Stat(path); err != nil {
		t.Fatalf("expected round.yaml at %s: %v", path, err)
	}

	got, err := s.Get("the-boys-room", "ROUND-0000001")
	if err != nil {
		t.Fatalf("Get: %v", err)
	}
	if got.ID != in.ID || got.WorldID != in.WorldID || got.Number != in.Number ||
		got.Status != in.Status || got.BaseRelease != in.BaseRelease {
		t.Fatalf("Get = %+v, want fields of %+v", got, in)
	}
}

func TestFileStore_UnsafeIDs(t *testing.T) {
	root := t.TempDir()
	s := &FileStore{Root: root}
	unsafe := Round{
		ID:          "ROUND-0000001",
		WorldID:     "../x",
		Number:      1,
		Status:      StatusOpen,
		BaseRelease: "1.0.0",
	}

	if err := s.Save(unsafe); err == nil {
		t.Fatal("Save with WorldID \"../x\" returned nil error, want an error")
	}
	if _, err := s.Get("../x", "ROUND-0000001"); err == nil {
		t.Fatal("Get with WorldID \"../x\" returned nil error, want an error")
	}

	entries, err := os.ReadDir(root)
	if err != nil {
		t.Fatalf("ReadDir root: %v", err)
	}
	if len(entries) != 0 {
		t.Fatalf("root has %d entries after unsafe Save/Get, want none", len(entries))
	}
	if _, err := os.Stat(filepath.Join(root, "x")); !os.IsNotExist(err) {
		t.Fatalf("unexpected file created outside the worlds tree: stat err = %v", err)
	}
}
