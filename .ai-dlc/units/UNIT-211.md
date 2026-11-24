# UNIT-211 — Act: Implement stale lock release and Startup

## Summary
Add LockFS, ReleaseStaleLock and Startup to the recovery package.

## Description
Create backend/worker/internal/recovery/locks.go with the LockFS abstraction, an os implementation, ReleaseStaleLock and Startup, which releases a stale lock then runs Recover. Uses Recoverer fields from recovery.go.

## How to act
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `backend/worker/internal/recovery/locks.go` · `new: LockFS, OSLockFS` · new
- **Do:** Define interface LockFS {ModTime(path string) (time.Time, error); Remove(path string) error} and struct OSLockFS implementing it with os.Stat(path).ModTime() and os.Remove(path).

```
func (OSLockFS) ModTime(p string) (time.Time, error) { fi, err := os.Stat(p); if err != nil { return time.Time{}, err }; return fi.ModTime(), nil }
```

- **Expected:** OSLockFS satisfies LockFS.

### Step 2 — `backend/worker/internal/recovery/locks.go` · `new: (*Recoverer).ReleaseStaleLock` · new
- **Do:** Implement ReleaseStaleLock() (bool, error): call lockFS.ModTime(cfg.LockPath); if errors.Is(err, fs.ErrNotExist) return false,nil; other errors wrapped as "recovery: stat lock: %w"; if now().Sub(mod) <= cfg.StaleAfter return false,nil; otherwise call lockFS.Remove, wrapping errors as "recovery: remove lock: %w" and ignoring fs.ErrNotExist, and return true,nil. Add a comment that StaleAfter must exceed Timeout times (MaxRetries+1).
- **Expected:** Returns true only when a stale lock was removed.

### Step 3 — `backend/worker/internal/recovery/locks.go` · `new: (*Recoverer).Startup` · new
- **Do:** Implement Startup(ctx) (Result, error): call ReleaseStaleLock; on error return Result{} and the error; then call Recover and set Result.LockReleased to the released value before returning.
- **Expected:** Stale lock is released before any execution is resumed.

## Acceptance criteria
- A lock older than StaleAfter is removed
- Startup runs Recover only after the lock check succeeds

## Definition of done
- Package builds
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-211.md`

## Scan baseline
- Scan version: `v1`
- Scan tip: `9cda5131c65b08541fc685d8a0898d39a0e9e9fa`

## Links
- Evidence: EVD-042
- Requirement: REQ-107
- Unit (Act): UNIT-211
- Unit (Verify): UNIT-215
- Status: completed
- Change: UPDATE
