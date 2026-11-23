package server

import (
	"io/fs"
	"os"
	"path/filepath"
	"strings"
	"testing"
)

// TestExecutionPackageRemoved guards against the retired internal/execution
// package being reintroduced into the backend tree.
func TestExecutionPackageRemoved(t *testing.T) {
	if _, err := os.Stat("../execution"); !os.IsNotExist(err) {
		t.Fatalf("execution still exists: %v", err)
	}
}

// Given the backend Go sources under ../.. (excluding this file),
// when each *.go file is read,
// then none of them contains the removed "internal/execution" import path.
func TestNoExecutionImports(t *testing.T) {
	const removed = "internal/execution"

	err := filepath.WalkDir("../..", func(path string, d fs.DirEntry, err error) error {
		if err != nil {
			return err
		}
		if d.IsDir() || filepath.Ext(path) != ".go" || filepath.Base(path) == "removed_code_test.go" {
			return nil
		}
		data, readErr := os.ReadFile(path)
		if readErr != nil {
			return readErr
		}
		if strings.Contains(string(data), removed) {
			t.Errorf("%s still references %q", path, removed)
		}
		return nil
	})
	if err != nil {
		t.Fatalf("walk: %v", err)
	}
}

// Given the retired backend/worker module,
// when its directory is stat-ed from the server package, then it does not exist;
// and given the backend Go sources under ../.. (excluding this file),
// when each *.go file is read, then none of them contains "storyforge/worker".
func TestWorkerModuleRemoved(t *testing.T) {
	if _, err := os.Stat("../../worker"); !os.IsNotExist(err) {
		t.Fatalf("worker still exists: %v", err)
	}

	const removed = "storyforge/worker"

	err := filepath.WalkDir("../..", func(path string, d fs.DirEntry, err error) error {
		if err != nil {
			return err
		}
		if d.IsDir() || filepath.Ext(path) != ".go" || filepath.Base(path) == "removed_code_test.go" {
			return nil
		}
		data, readErr := os.ReadFile(path)
		if readErr != nil {
			return readErr
		}
		if strings.Contains(string(data), removed) {
			t.Errorf("%s still references %q", path, removed)
		}
		return nil
	})
	if err != nil {
		t.Fatalf("walk: %v", err)
	}
}

// Given the server package sources server.go and rounds_adapter.go,
// when each file is read from the package directory,
// then neither contains the removed execution identifiers
// "execution.", "ExecutionHandler", or the retired "storyforge/worker" import path.
func TestServerHasNoExecutionWiring(t *testing.T) {
	banned := []string{"execution.", "ExecutionHandler", "storyforge/worker"}

	for _, f := range []string{"server.go", "rounds_adapter.go"} {
		data, err := os.ReadFile(f)
		if err != nil {
			t.Fatalf("read %s: %v", f, err)
		}
		for _, b := range banned {
			if strings.Contains(string(data), b) {
				t.Errorf("%s still references %q", f, b)
			}
		}
	}
}

// Given the server package sources (../server) and the cmd/server entrypoint
// (../../cmd/server), excluding this file,
// when each *.go file is read,
// then none of them references the removed worker config keys
// "cfg.Worker", "WorkRoot", "MaxBudget" or "AutoPublish".
func TestNoWorkerConfigReferences(t *testing.T) {
	banned := []string{"cfg.Worker", "WorkRoot", "MaxBudget", "AutoPublish"}

	for _, root := range []string{"../server", "../../cmd/server"} {
		err := filepath.WalkDir(root, func(path string, d fs.DirEntry, err error) error {
			if err != nil {
				return err
			}
			if d.IsDir() || filepath.Ext(path) != ".go" || filepath.Base(path) == "removed_code_test.go" {
				return nil
			}
			data, readErr := os.ReadFile(path)
			if readErr != nil {
				return readErr
			}
			for _, b := range banned {
				if strings.Contains(string(data), b) {
					t.Errorf("%s still references %q", path, b)
				}
			}
			return nil
		})
		if err != nil {
			t.Fatalf("walk %s: %v", root, err)
		}
	}
}
