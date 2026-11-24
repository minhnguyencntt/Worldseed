# UNIT-166 — Verify: Config loader, logger and lock unit tests

## Summary
Unit tests for config defaults/validation, JSON logging and lock exclusivity

## Description
Write TDD-style unit tests from R1 using fstest.MapFS, a bytes.Buffer and t.TempDir only.

## How to verify
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `worker/internal/config/config_test.go` · `new: TestLoadFS_Defaults, TestLoadFS_Invalid` · new
- **Do:** Add TestLoadFS_Defaults loading a MapFS yaml with only world, repo_path, work_root and asserting PollInterval 30s, ExecTimeout 30m, MaxRetries 2, AutoPublish false, Provider.Kind mock; add TestLoadFS_Invalid table-driven over empty world, exec_timeout -1s, max_budget_usd -1 asserting error text contains the field name
- **Run:** `cd worker && go test ./internal/config -run 'TestLoadFS'`
- **Expected:** Both tests pass

### Step 2 — `worker/internal/logging/logging_test.go` · `new: TestNew_JSON` · new
- **Do:** Call New("info", &buf), log Info("hello"), json.Unmarshal the line and assert msg == hello and level == INFO; assert a Debug line is not emitted
- **Run:** `cd worker && go test ./internal/logging -run TestNew_JSON`
- **Expected:** Test passes

### Step 3 — `worker/internal/lock/lock_test.go` · `new: TestAcquire_Exclusive, TestRelease_OnlyOwner` · new
- **Do:** In t.TempDir, Acquire(path,"a") succeeds, Acquire(path,"b") errors.Is ErrLocked; a Lock with owner b built via a stale copy does not remove the file; after Release of a, Acquire(path,"b") succeeds
- **Run:** `cd worker && go test ./internal/lock -run 'TestAcquire|TestRelease'`
- **Expected:** Both tests pass

## Acceptance criteria
- Defaults and validation errors asserted
- Logger output decodes as JSON with msg and level
- Second Acquire returns ErrLocked and release re-enables it

## Definition of done
- Tests pass in seconds
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-166.md`

## Links
- Evidence: EVD-035
- Requirement: REQ-081
- Unit (Act): UNIT-161
- Unit (Verify): UNIT-166
- Status: completed
- Change: UPDATE
