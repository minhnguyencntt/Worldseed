# UNIT-247 — Verify: Remaining config keys load and cmd uses no removed key unit tests

## Summary
Unit tests prove the example config and defaults load and no source reads a removed key

## Description
Add tests proving REQ2 acceptance criteria using the example file, fstest and file reads of Go sources in a temp-free read-only way.

## How to verify
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `backend/internal/config/config_test.go` · `new: TestLoad_ExampleConfig` · after L181
- **Do:** Add a test calling Load("../../configs/config.example.yaml"). Assert no error, Server.Addr is ":8080", Round.Duration is 24*time.Hour and Contribution.MaxPromptLen is 500.
- **Run:** `cd backend && go test ./internal/config -run TestLoad_ExampleConfig`
- **Expected:** Test passes

### Step 2 — `backend/internal/config/config_test.go` · `new: TestLoadFS_MinimalDefaults` · after L181
- **Do:** Add a test loading 'auth:\n  token_secret: s\n' via LoadFS with a getenv returning ''. Assert Round.SchedulerInterval is 30*time.Second, Storage.ContentDir is "game/content" and Contribution.RateMax is 3.
- **Run:** `cd backend && go test ./internal/config -run TestLoadFS_MinimalDefaults`
- **Expected:** Test passes

### Step 3 — `backend/internal/server/removed_code_test.go` · `new: TestNoWorkerConfigReferences` · after L50
- **Do:** Add a test that walks ../server and ../../cmd/server for *.go files (skipping removed_code_test.go), and fails if any contains cfg.Worker, WorkRoot, MaxBudget or AutoPublish.
- **Run:** `cd backend && go test ./internal/server -run TestNoWorkerConfigReferences`
- **Expected:** Test passes

## Acceptance criteria
- Example config loads with expected values
- Minimal config gets defaults
- No Go source under cmd or internal/server mentions worker config fields

## Definition of done
- New tests pass
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-247.md`

## Links
- Evidence: EVD-048
- Requirement: REQ-123
- Unit (Act): UNIT-245
- Unit (Verify): UNIT-247
- Status: completed
- Change: UPDATE
