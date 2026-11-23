package provider

import (
	"context"
	"errors"
	"os"
	"path/filepath"
	"strings"
	"testing"

	"github.com/worldseed/storyforge/worker/internal/runner"
)

// Compile-time check: Mock must satisfy the runner Agent contract.
var _ runner.Agent = Mock{}

// Given a fresh work directory, when the Mock agent runs,
// then it reports zero cost, returns no error and writes the MOCK marker file.
func TestMockRunWritesMarker(t *testing.T) {
	dir := t.TempDir()

	cost, err := Mock{}.Run(context.Background(), dir)
	if err != nil {
		t.Fatalf("Run returned error: %v", err)
	}
	if cost != 0 {
		t.Fatalf("Run cost = %v, want 0", cost)
	}

	data, err := os.ReadFile(filepath.Join(dir, MockMarkerFile))
	if err != nil {
		t.Fatalf("read marker file: %v", err)
	}
	if !strings.Contains(string(data), "MOCK") {
		t.Fatalf("marker file does not contain MOCK: %q", string(data))
	}
}

// Given an already cancelled context, when the Mock agent runs,
// then it returns context.Canceled and does not write the marker file.
func TestMockRunCancelled(t *testing.T) {
	dir := t.TempDir()
	ctx, cancel := context.WithCancel(context.Background())
	cancel()

	_, err := Mock{}.Run(ctx, dir)
	if !errors.Is(err, context.Canceled) {
		t.Fatalf("Run error = %v, want context.Canceled", err)
	}

	if _, statErr := os.Stat(filepath.Join(dir, MockMarkerFile)); !os.IsNotExist(statErr) {
		t.Fatalf("marker file exists or stat failed unexpectedly: %v", statErr)
	}
}
