# UNIT-009 — Verify: Worker config LoadFS unit tests

## Summary
Add Go unit tests for LoadWorkerFS success and validation errors using MapFS.

## Description
Context: ACT-WORKER added LoadWorkerFS without tests.
Desired behavior: Prove success path and validation errors with fstest.MapFS only.
Expected result: Filtered go test for worker config passes.
Why: Maps REQ-WORKER config ACs to unit evidence.

## How to verify
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `worker_config_test.go` · `new: TestLoadWorkerFS_Success` · new
- **Do:** Add TestLoadWorkerFS_Success with MapFS file config.yaml matching example values; assert all four fields. Add TestLoadWorkerFS_InvalidTimeout with timeout_seconds 0; assert err != nil. Package main.

```
package main

import (
  "testing"
  "testing/fstest"
)

func TestLoadWorkerFS_Success(t *testing.T) {
  fsys := fstest.MapFS{
    "config.yaml": &fstest.MapFile{Data: []byte("repo_path: \".\"\nworktree_dir: \".worktrees\"\nagent:\n  command: claude\nexecution:\n  timeout_seconds: 3600\n")},
  }
  cfg, err := LoadWorkerFS(fsys, "config.yaml")
  if err != nil {
    t.Fatalf("LoadWorkerFS: %v", err)
  }
  if cfg.RepoPath != "." || cfg.WorktreeDir != ".worktrees" || cfg.Agent.Command != "claude" || cfg.Execution.TimeoutSeconds != 3600 {
    t.Fatalf("unexpected cfg: %+v", cfg)
  }
}

func TestLoadWorkerFS_InvalidTimeout(t *testing.T) {
  fsys := fstest.MapFS{
    "config.yaml": &fstest.MapFile{Data: []byte("repo_path: \".\"\nworktree_dir: \".worktrees\"\nagent:\n  command: claude\nexecution:\n  timeout_seconds: 0\n")},
  }
  if _, err := LoadWorkerFS(fsys, "config.yaml"); err == nil {
    t.Fatal("expected timeout validation error")
  }
}
```

- **Run:** `go test . -run 'TestLoadWorkerFS_' -count=1`
- **Expected:** TestLoadWorkerFS_Success and TestLoadWorkerFS_InvalidTimeout pass.

## Acceptance criteria
- Given valid MapFS YAML, when LoadWorkerFS runs, then RepoPath ., WorktreeDir .worktrees, Agent.Command claude, TimeoutSeconds 3600.
- Given YAML with timeout_seconds 0, when LoadWorkerFS runs, then it returns an error.

## Definition of done
- worker_config_test.go exists and filtered go test passes
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-009.md`

## Links
- Evidence: EVD-002
- Requirement: REQ-005
- Unit (Act): UNIT-005
- Unit (Verify): UNIT-009
- Status: completed
- Change: UPDATE
