# UNIT-215 — Verify: Stale lock release and Startup unit tests with fake clock

## Summary
Unit tests for ReleaseStaleLock and Startup ordering.

## Description
Tests in locks_test.go with a fakeLockFS and fixed clock; the real filesystem is not touched.

## How to verify
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `backend/worker/internal/recovery/locks_test.go` · `new: fakeLockFS, TestStartupReleasesStaleLock` · new
- **Do:** Config{LockPath:"w/lock", StaleAfter:time.Hour}, now fixed, fake lock modTime = now minus 2h, seed a RUNNING execution; call Startup; assert fakeLockFS.removed equals ["w/lock"], Result.LockReleased true and the execution was resumed.
- **Run:** `cd backend/worker && go test ./internal/recovery -run TestStartupReleasesStaleLock`
- **Expected:** Test passes.

### Step 2 — `backend/worker/internal/recovery/locks_test.go` · `new: TestStartupKeepsFreshOrMissingLock` · new
- **Do:** Table test with modTime = now minus 10m and with modErr = fs.ErrNotExist; assert removed is empty, LockReleased false and err nil.
- **Run:** `cd backend/worker && go test ./internal/recovery -run TestStartupKeepsFreshOrMissingLock`
- **Expected:** Test passes.

### Step 3 — `backend/worker/internal/recovery/locks_test.go` · `new: TestStartupRemoveFailureStopsRecovery` · new
- **Do:** Stale lock with removeErr = errors.New("perm") and a RUNNING execution; assert errors.Is(err, removeErr) and the resumer recorded no IDs.
- **Run:** `cd backend/worker && go test ./internal/recovery -run TestStartupRemoveFailureStopsRecovery`
- **Expected:** Test passes.

## Acceptance criteria
- Stale lock removed
- Fresh or missing lock kept
- Remove failure stops resumption

## Definition of done
- Tests pass
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-215.md`

## Links
- Evidence: EVD-042
- Requirement: REQ-107
- Unit (Act): UNIT-211
- Unit (Verify): UNIT-215
- Status: completed
- Change: UPDATE
