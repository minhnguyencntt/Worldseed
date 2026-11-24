# UNIT-246 — Verify: Config carries no worker or execution keys unit tests

## Summary
Unit tests guard the Config struct, example YAML and worker-section handling

## Description
Add tests to config_test.go proving REQ1 acceptance criteria with no network or real server.

## How to verify
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `backend/internal/config/config_test.go` · `new: TestConfig_HasNoWorkerFields` · after L181
- **Do:** Add a test that uses reflect.TypeOf(Config{}) and collects NumField names, asserting the set equals Server, Auth, Git, Hosting, Storage, Contribution, Admin, Round.
- **Run:** `cd backend && go test ./internal/config -run TestConfig_HasNoWorkerFields`
- **Expected:** Test passes

### Step 2 — `backend/internal/config/config_test.go` · `new: TestExampleYAML_TopLevelKeys` · after L181
- **Do:** Add a test that reads ../../configs/config.example.yaml, yaml.Unmarshal into map[string]any, and asserts the keys are exactly server, auth, git, hosting, storage, contribution, admin, round.
- **Run:** `cd backend && go test ./internal/config -run TestExampleYAML_TopLevelKeys`
- **Expected:** Test passes

### Step 3 — `backend/internal/config/config_test.go` · `new: TestLoadFS_IgnoresWorkerSection` · after L181
- **Do:** Add a test with an fstest.MapFS YAML of 'auth:\n  token_secret: s\nworker:\n  work_root: /tmp\n'. Assert LoadFS returns no error and cfg.Auth.TokenSecret is 's'.
- **Run:** `cd backend && go test ./internal/config -run TestLoadFS_IgnoresWorkerSection`
- **Expected:** Test passes

## Acceptance criteria
- Config top-level fields are exactly the eight kept
- Example YAML top-level keys are exactly the eight kept
- A worker section in YAML is ignored

## Definition of done
- New tests pass
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-246.md`

## Links
- Evidence: EVD-048
- Requirement: REQ-122
- Unit (Act): UNIT-244
- Unit (Verify): UNIT-246
- Status: completed
- Change: UPDATE
