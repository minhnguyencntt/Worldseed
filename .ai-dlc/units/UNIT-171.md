# UNIT-171 — Act: Create worker module and config loader

## Summary
Add backend/worker go.mod, config package and example YAML

## Description
Create the module and the config LoadFS mirroring backend/internal/config/config.go.

## How to act
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `backend/worker/go.mod` · `new: module github.com/worldseed/storyforge/worker` · new
- **Do:** Create go.mod declaring module github.com/worldseed/storyforge/worker, go 1.22, requiring gopkg.in/yaml.v3 v3.0.1; copy the yaml.v3 and gopkg.in/check.v1 lines from backend/go.sum into backend/worker/go.sum.

```
module github.com/worldseed/storyforge/worker

go 1.22

require gopkg.in/yaml.v3 v3.0.1
```

- **Expected:** go list ./... in backend/worker resolves the module

### Step 2 — `backend/worker/internal/config/config.go` · `new: Config, WorkerConfig, LogConfig, StoreConfig, Load, LoadFS, applyEnv` · new
- **Do:** Define Config{Worker WorkerConfig `yaml:"worker"`; Log LogConfig `yaml:"log"`; Store StoreConfig `yaml:"store"`}; WorkerConfig{WorldID, RepoPath string; PollInterval, ExecutionTimeout time.Duration; MaxRetries int}; LogConfig{Level string}; StoreConfig{Dir, LockPath string}. LoadFS(fsys fs.FS, name string, getenv func(string) string) reads with fs.ReadFile, yaml.Unmarshal, applyEnv (STORYFORGE_WORKER_REPO_PATH -> Worker.RepoPath, STORYFORGE_WORKER_WORLD_ID -> Worker.WorldID), returns error 'config: worker.repo_path must not be empty' when RepoPath is empty, then defaults: PollInterval 30s, ExecutionTimeout 30m, MaxRetries 2 (when 0), Log.Level 'info', Store.Dir '.storyforge/executions', Store.LockPath '.storyforge/worker.lock', WorldID 'the-boys-room'. Load(path) calls LoadFS(os.DirFS(filepath.Dir(path)), filepath.Base(path), os.Getenv).

```
func LoadFS(fsys fs.FS, name string, getenv func(string) string) (*Config, error)
```

- **Expected:** Package compiles and mirrors the backend loader

### Step 3 — `backend/worker/configs/config.example.yaml` · `new: example config` · new
- **Do:** Add YAML with worker.world_id the-boys-room, worker.repo_path '.', poll_interval 30s, execution_timeout 30m, max_retries 2, log.level info, store.dir .storyforge/executions, store.lock_path .storyforge/worker.lock.
- **Expected:** File parses through config.LoadFS

## Acceptance criteria
- config.LoadFS fills defaults and applies env overrides
- Empty repo_path returns an error

## Definition of done
- go build ./... passes in backend/worker
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-171.md`

## Scan baseline
- Scan version: `v1`
- Scan tip: `9cda5131c65b08541fc685d8a0898d39a0e9e9fa`

## Links
- Evidence: EVD-036
- Requirement: REQ-086
- Unit (Act): UNIT-171
- Unit (Verify): UNIT-175
- Status: completed
- Change: UPDATE
