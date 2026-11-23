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
