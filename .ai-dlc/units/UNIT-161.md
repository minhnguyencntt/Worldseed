# UNIT-161 — Act: Create worker module with config, logging and file lock

## Summary
Add worker/go.mod, config.LoadFS, logging.New and lock.Acquire

## Description
Create the module and three small packages following backend/internal/config conventions. Desired behavior as in the requirement; no tests here.

## How to act
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `worker/go.mod` · `new: module github.com/worldseed/storyforge/worker` · new
- **Do:** Create go.mod with module path github.com/worldseed/storyforge/worker, go 1.22 and require gopkg.in/yaml.v3 v3.0.1; create worker/go.sum by copying the gopkg.in/yaml.v3 and gopkg.in/check.v1 lines from backend/go.sum

```
module github.com/worldseed/storyforge/worker

go 1.22

require gopkg.in/yaml.v3 v3.0.1
```

- **Expected:** go build ./... resolves yaml.v3 without network

### Step 2 — `worker/internal/config/config.go` · `new: Config, ProviderConfig, LoadFS` · new
- **Do:** Define Config{World, RepoPath, WorkRoot string; PollInterval, ExecTimeout time.Duration; MaxRetries int; MaxBudgetUSD float64; AutoPublish bool; LogLevel string; Provider ProviderConfig{Kind, Command string; Args []string}} with yaml tags world, repo_path, work_root, poll_interval, exec_timeout, max_retries, max_budget_usd, auto_publish, log_level, provider. LoadFS(fsys fs.FS, name string) (Config, error) reads and yaml.Unmarshals, applies defaults when zero (PollInterval 30s, ExecTimeout 30m, MaxRetries 2, MaxBudgetUSD 5, LogLevel info, Provider.Kind mock) and returns fmt.Errorf naming the field when World or RepoPath or WorkRoot is empty, ExecTimeout or PollInterval is negative, MaxRetries or MaxBudgetUSD is negative
- **Expected:** Valid YAML returns Config; invalid returns error containing the field name

### Step 3 — `worker/internal/logging/logging.go` · `new: New` · new
- **Do:** Add New(level string, w io.Writer) *slog.Logger that maps debug|info|warn|error (default info) to slog.Level and returns slog.New(slog.NewJSONHandler(w, &slog.HandlerOptions{Level: lvl}))
- **Expected:** Log lines are one JSON object each

### Step 4 — `worker/internal/lock/lock.go` · `new: Acquire, Lock.Release, ErrLocked` · new
- **Do:** Add ErrLocked = errors.New("lock: held"). Acquire(path, owner string) (*Lock, error) does MkdirAll(filepath.Dir(path)), os.OpenFile(path, O_CREATE|O_EXCL|O_WRONLY, 0o644), returns ErrLocked on fs.ErrExist, writes owner into the file. (*Lock).Release() reads the file and removes it only if its content equals the owner, returning nil when already gone; add Owner(path) (string, error) reading the owner
- **Expected:** Second Acquire returns ErrLocked; after Release Acquire succeeds

## Acceptance criteria
- config.LoadFS(fsys, name) returns a Config with defaults and validation errors
- logging.New(level, w) returns a *slog.Logger writing JSON
- lock.Acquire(path, owner) returns *Lock or ErrLocked and Release removes the file only for the owner

## Definition of done
- go build ./... succeeds in worker/
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-161.md`

## Scan baseline
- Scan version: `v1`
- Scan tip: `9cda5131c65b08541fc685d8a0898d39a0e9e9fa`

## Links
- Evidence: EVD-035
- Requirement: REQ-081
- Unit (Act): UNIT-161
- Unit (Verify): UNIT-166
- Status: completed
- Change: UPDATE
