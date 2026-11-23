# UNIT-005 — Act: Scaffold worker Go module and YAML config

## Summary
Create worker LoadFS config for repo/worktree/agent/timeout, example YAML, stub entry in root Go module.

## Description
Context: No worker sources exist; root go.mod exists after ACT-BE.
Desired behavior: Add worker YAML config fields required by REQ-WORKER and a stub that only loads config.
Expected result: Worker configures paths/commands without invoking Claude CLI.
Why: Implements REQ-WORKER product code only.

## How to act
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `worker_config.go` · `new: LoadWorkerFS` · new
- **Do:** Create WorkerConfig with RepoPath string yaml:"repo_path", WorktreeDir string yaml:"worktree_dir", Agent struct{Command string yaml:"command"} yaml:"agent", Execution struct{TimeoutSeconds int yaml:"timeout_seconds"} yaml:"execution". Export LoadWorkerFS(fsys fs.FS, name string) (*WorkerConfig, error) decoding YAML and returning error if RepoPath empty, Agent.Command empty, or TimeoutSeconds <= 0. Package main.

```
package main

import (
  "fmt"
  "io/fs"

  "gopkg.in/yaml.v3"
)

type WorkerAgentConfig struct {
  Command string `yaml:"command"`
}

type WorkerExecutionConfig struct {
  TimeoutSeconds int `yaml:"timeout_seconds"`
}

type WorkerConfig struct {
  RepoPath    string                `yaml:"repo_path"`
  WorktreeDir string                `yaml:"worktree_dir"`
  Agent       WorkerAgentConfig     `yaml:"agent"`
  Execution   WorkerExecutionConfig `yaml:"execution"`
}

func LoadWorkerFS(fsys fs.FS, name string) (*WorkerConfig, error) {
  f, err := fsys.Open(name)
  if err != nil {
    return nil, err
  }
  defer f.Close()
  var cfg WorkerConfig
  if err := yaml.NewDecoder(f).Decode(&cfg); err != nil {
    return nil, err
  }
  if cfg.RepoPath == "" {
    return nil, fmt.Errorf("repo_path is required")
  }
  if cfg.Agent.Command == "" {
    return nil, fmt.Errorf("agent.command is required")
  }
  if cfg.Execution.TimeoutSeconds <= 0 {
    return nil, fmt.Errorf("execution.timeout_seconds must be > 0")
  }
  return &cfg, nil
}
```

- **Expected:** LoadWorkerFS validates required config fields via fs.FS.

### Step 2 — `worker.config.example.yaml` · `new: worker.config.example.yaml` · new
- **Do:** Create example YAML with repo_path ., worktree_dir .worktrees, agent.command claude, execution.timeout_seconds 3600.

```
repo_path: "."
worktree_dir: ".worktrees"
agent:
  command: claude
execution:
  timeout_seconds: 3600
```

- **Expected:** Example worker YAML documents required keys.

### Step 3 — `worker.go` · `new: runWorker` · new
- **Do:** Create runWorker(cfgPath string) int that calls LoadWorkerFS(os.DirFS("."), cfgPath), prints repo_path and agent.command, returns 0 on success / 1 on error. Do not exec the agent command. Package main.

```
package main

import (
  "fmt"
  "os"
)

func runWorker(cfgPath string) int {
  cfg, err := LoadWorkerFS(os.DirFS("."), cfgPath)
  if err != nil {
    fmt.Fprintf(os.Stderr, "worker config: %v\n", err)
    return 1
  }
  fmt.Printf("storyforge worker config loaded repo=%s agent=%s timeout=%d\n", cfg.RepoPath, cfg.Agent.Command, cfg.Execution.TimeoutSeconds)
  return 0
}
```

- **Expected:** Worker stub loads config without invoking external agents.

### Step 4 — `main.go` · `main mode flag` · L1-L30
- **Do:** Update main to accept -mode flag default server; when mode is worker, call os.Exit(runWorker(*cfgPath)) before server path; keep existing server LoadFS path for mode server.

```
before: only server LoadFS path
after: mode := flag.String("mode", "server", "server|worker"); if *mode == "worker" { os.Exit(runWorker(*cfgPath)) } then existing server path
```

- **Expected:** main supports -mode=worker without listening or invoking Claude CLI.

## Acceptance criteria
- Given Act complete, when inspecting the root, then worker.go, worker_config.go, and worker.config.example.yaml exist.
- Given example-shaped YAML, when LoadWorkerFS reads it, then RepoPath, WorktreeDir, Agent.Command, and Execution.TimeoutSeconds populate.

## Definition of done
- All code_paths created
- No test files added by this Act
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-005.md`

## Scan baseline
- Scan version: `v1`
- Scan tip: `9cda5131c65b08541fc685d8a0898d39a0e9e9fa`

## Links
- Evidence: EVD-002
- Requirement: REQ-005
- Unit (Act): UNIT-005
- Unit (Verify): UNIT-009
- Status: completed
- Change: NEW
