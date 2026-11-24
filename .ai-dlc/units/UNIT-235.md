# UNIT-235 — Verify: backend/worker is gone and not imported unit tests

## Summary
Filesystem unit test proving the worker module is deleted and unreferenced.

## Description
Add a unit test that stats backend/worker and scans backend Go files for worker imports.

## How to verify
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `backend/internal/server/removed_code_test.go` · `new: TestWorkerModuleRemoved` · new
- **Do:** Create the file with package server and TestWorkerModuleRemoved: os.Stat("../../worker") must return os.IsNotExist; then filepath.WalkDir("../..") over *.go files and fail if any file content contains "storyforge/worker" (skip removed_code_test.go itself).

```
if _, err := os.Stat("../../worker"); !os.IsNotExist(err) { t.Fatalf("worker still exists: %v", err) }
```

- **Run:** `cd backend && go test ./internal/server -run TestWorkerModuleRemoved`
- **Expected:** Test passes.

## Acceptance criteria
- Given the backend tree, when ../../worker is stat'ed, then it is not found.
- Given backend Go files, when scanned, then none contain storyforge/worker.

## Definition of done
- Test passes
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-235.md`

## Links
- Evidence: EVD-046
- Requirement: REQ-116
- Unit (Act): UNIT-232
- Unit (Verify): UNIT-235
- Status: completed
- Change: UPDATE
