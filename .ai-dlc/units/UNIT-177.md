# UNIT-177 — Verify: File lock unit tests

## Summary
Unit tests for exclusive acquire and release

## Description
Test lock in t.TempDir().

## How to verify
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `backend/worker/internal/lock/lock_test.go` · `new: TestAcquire_Exclusive` · new
- **Do:** p:=filepath.Join(t.TempDir(),'w.lock'); l,err:=Acquire(p) succeeds; second Acquire(p) returns error with errors.Is(err, ErrLocked).
- **Run:** `cd backend/worker && go test ./internal/lock -run TestAcquire_Exclusive`
- **Expected:** Test TestAcquire_Exclusive passes (ok line printed)

### Step 2 — `backend/worker/internal/lock/lock_test.go` · `new: TestRelease_AllowsReacquire` · new
- **Do:** Acquire, Release (twice, second returns nil), then Acquire again succeeds.
- **Run:** `cd backend/worker && go test ./internal/lock -run TestRelease_AllowsReacquire`
- **Expected:** Test TestRelease_AllowsReacquire passes (ok line printed)

## Acceptance criteria
- ErrLocked asserted
- Re-acquire after Release asserted

## Definition of done
- tests pass
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-177.md`

## Links
- Evidence: EVD-036
- Requirement: REQ-088
- Unit (Act): UNIT-173
- Unit (Verify): UNIT-177
- Status: completed
- Change: UPDATE
