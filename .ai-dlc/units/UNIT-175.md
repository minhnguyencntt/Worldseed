# UNIT-175 — Verify: Worker config LoadFS unit tests

## Summary
Unit tests for defaults, env override and empty repo_path

## Description
Test config.LoadFS with fstest.MapFS and a fake getenv.

## How to verify
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `backend/worker/internal/config/config_test.go` · `new: TestLoadFS_Defaults` · new
- **Do:** Given MapFS config.yaml containing 'worker:\n  repo_path: /r', call LoadFS with getenv returning ''; assert PollInterval==30s, ExecutionTimeout==30m, MaxRetries==2, Store.Dir=='.storyforge/executions', Log.Level=='info'.
- **Run:** `cd backend/worker && go test ./internal/config -run TestLoadFS_Defaults`
- **Expected:** Test TestLoadFS_Defaults passes (ok line printed)

### Step 2 — `backend/worker/internal/config/config_test.go` · `new: TestLoadFS_EnvOverride` · new
- **Do:** Given YAML repo_path '/yaml' and getenv map STORYFORGE_WORKER_REPO_PATH='/env', assert cfg.Worker.RepoPath=='/env'.
- **Run:** `cd backend/worker && go test ./internal/config -run TestLoadFS_EnvOverride`
- **Expected:** Test TestLoadFS_EnvOverride passes (ok line printed)

### Step 3 — `backend/worker/internal/config/config_test.go` · `new: TestLoadFS_EmptyRepoPath` · new
- **Do:** Given YAML 'log:\n  level: info' without repo_path and empty getenv, assert LoadFS returns a non-nil error mentioning repo_path.
- **Run:** `cd backend/worker && go test ./internal/config -run TestLoadFS_EmptyRepoPath`
- **Expected:** Test TestLoadFS_EmptyRepoPath passes (ok line printed)

## Acceptance criteria
- Defaults asserted
- Env override asserted
- Empty repo_path error asserted

## Definition of done
- tests pass
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-175.md`

## Links
- Evidence: EVD-036
- Requirement: REQ-086
- Unit (Act): UNIT-171
- Unit (Verify): UNIT-175
- Status: completed
- Change: NEW
