package contribution

import (
	"context"
	"encoding/json"
	"errors"
	"strings"
	"testing"
	"time"
)

// TestExporter_OnlyFrozen verifies that Exporter includes only the
// contributions frozen in the Round's snapshot, in snapshot order, and maps
// each one onto the export shape.
//
// Given a fake source holding contributions A, B and C (all by player p1 with
// a fixed CreatedAt) and a snapshot that freezes [C, A],
// When Export is called for world "w" and round "ROUND-0000001",
// Then the export lists contributions [C, A] only, B is absent, each Author is
// the PlayerID, each Content is the Prompt, and Version, WorldID and RoundID
// are set.
func TestExporter_OnlyFrozen(t *testing.T) {
	createdAt := time.Date(2026, 1, 2, 3, 4, 5, 0, time.UTC)
	src := &fakeSource{
		contributions: []Contribution{
			{ID: "A", WorldID: "w", RoundID: "ROUND-0000001", PlayerID: "p1", Prompt: "prompt A", CreatedAt: createdAt},
			{ID: "B", WorldID: "w", RoundID: "ROUND-0000001", PlayerID: "p1", Prompt: "prompt B", CreatedAt: createdAt},
			{ID: "C", WorldID: "w", RoundID: "ROUND-0000001", PlayerID: "p1", Prompt: "prompt C", CreatedAt: createdAt},
		},
		frozen: []string{"C", "A"},
	}

	export, err := NewExporter(src).Export(context.Background(), "w", "ROUND-0000001")
	if err != nil {
		t.Fatalf("Export: %v", err)
	}

	if export.Version != ExportVersion {
		t.Errorf("Version = %d, want %d", export.Version, ExportVersion)
	}
	if export.WorldID != "w" {
		t.Errorf("WorldID = %q, want %q", export.WorldID, "w")
	}
	if export.RoundID != "ROUND-0000001" {
		t.Errorf("RoundID = %q, want %q", export.RoundID, "ROUND-0000001")
	}

	gotIDs := make([]string, 0, len(export.Contributions))
	for _, c := range export.Contributions {
		gotIDs = append(gotIDs, c.ID)
	}
	wantIDs := []string{"C", "A"}
	if len(gotIDs) != len(wantIDs) || gotIDs[0] != wantIDs[0] || gotIDs[1] != wantIDs[1] {
		t.Fatalf("Contribution IDs = %v, want %v", gotIDs, wantIDs)
	}

	wantContent := map[string]string{"C": "prompt C", "A": "prompt A"}
	for _, c := range export.Contributions {
		if c.Author != "p1" {
			t.Errorf("contribution %s Author = %q, want %q", c.ID, c.Author, "p1")
		}
		if c.Content != wantContent[c.ID] {
			t.Errorf("contribution %s Content = %q, want %q", c.ID, c.Content, wantContent[c.ID])
		}
		if !c.CreatedAt.Equal(createdAt) {
			t.Errorf("contribution %s CreatedAt = %v, want %v", c.ID, c.CreatedAt, createdAt)
		}
	}
}

// TestExporter_EmptyRound verifies that a Round with no frozen ids exports an
// empty contributions list, never a nil one, so the JSON reads "[]".
//
// Given a fake source holding contributions but a nil frozen list,
// When Export is called for world "w" and round "ROUND-0000001",
// Then Contributions is non-nil with length 0, and the JSON encoding contains
// "contributions":[].
func TestExporter_EmptyRound(t *testing.T) {
	createdAt := time.Date(2026, 1, 2, 3, 4, 5, 0, time.UTC)
	src := &fakeSource{
		contributions: []Contribution{
			{ID: "A", WorldID: "w", RoundID: "ROUND-0000001", PlayerID: "p1", Prompt: "prompt A", CreatedAt: createdAt},
		},
		frozen: nil,
	}

	export, err := NewExporter(src).Export(context.Background(), "w", "ROUND-0000001")
	if err != nil {
		t.Fatalf("Export: %v", err)
	}
	if export.Contributions == nil {
		t.Fatal("Contributions = nil, want non-nil empty slice")
	}
	if len(export.Contributions) != 0 {
		t.Fatalf("len(Contributions) = %d, want 0", len(export.Contributions))
	}

	raw, err := json.Marshal(export)
	if err != nil {
		t.Fatalf("json.Marshal: %v", err)
	}
	if !strings.Contains(string(raw), `"contributions":[]`) {
		t.Errorf("JSON = %s, want it to contain %q", raw, `"contributions":[]`)
	}
}

// errSource is an ExportSource whose methods return configured errors.
type errSource struct {
	frozenErr error
	listErr   error
}

func (e *errSource) ListByRound(_ context.Context, _, _ string) ([]Contribution, error) {
	return nil, e.listErr
}

func (e *errSource) FrozenIDs(_ context.Context, _, _ string) ([]string, error) {
	return nil, e.frozenErr
}

// TestExporter_SourceErrors verifies that errors returned by the source are
// propagated by Export and remain matchable with errors.Is.
//
// Given an error source whose FrozenIDs returns ErrNotFound,
// When Export is called,
// Then the returned error matches ErrNotFound.
//
// Given an error source whose ListByRound returns a custom error,
// When Export is called,
// Then the returned error matches that custom error.
func TestExporter_SourceErrors(t *testing.T) {
	t.Run("FrozenIDs ErrNotFound is propagated", func(t *testing.T) {
		src := &errSource{frozenErr: ErrNotFound}
		_, err := NewExporter(src).Export(context.Background(), "w", "ROUND-0000001")
		if !errors.Is(err, ErrNotFound) {
			t.Fatalf("Export error = %v, want errors.Is ErrNotFound", err)
		}
	})

	t.Run("ListByRound custom error is propagated", func(t *testing.T) {
		errBoom := errors.New("boom: list failed")
		src := &errSource{listErr: errBoom}
		_, err := NewExporter(src).Export(context.Background(), "w", "ROUND-0000001")
		if !errors.Is(err, errBoom) {
			t.Fatalf("Export error = %v, want errors.Is custom list error", err)
		}
	})
}
