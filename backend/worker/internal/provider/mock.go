// Package provider holds the agent providers the worker can run a Round with.
package provider

import (
	"context"
	"fmt"
	"os"
	"path/filepath"
)

// MockMarkerFile is the file the Mock provider writes into the work directory
// so every run it produces is clearly labelled as mock output.
const MockMarkerFile = "MOCK-EXECUTION.md"

const mockNotice = "# MOCK EXECUTION\n\nThis run used the MOCK provider. No real development happened.\n"

// Mock is a labelled stand-in agent. It performs no development; it only
// marks the work directory as mock output.
type Mock struct{}

// Name returns the provider identifier.
func (Mock) Name() string { return "mock" }

// Run honours ctx and writes MockMarkerFile into workDir. It returns a cost of
// zero on success.
func (Mock) Run(ctx context.Context, workDir string) (float64, error) {
	if err := ctx.Err(); err != nil {
		return 0, err
	}
	path := filepath.Join(workDir, MockMarkerFile)
	if err := os.WriteFile(path, []byte(mockNotice), 0o644); err != nil {
		return 0, fmt.Errorf("provider mock: write marker: %w", err)
	}
	return 0, nil
}
