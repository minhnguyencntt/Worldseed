# UNIT-173 — Act: Implement the exclusive file lock

## Summary
Add lock.Acquire, Release and ErrLocked

## Description
Implement the per-World file lock.

## How to act
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `backend/worker/internal/lock/lock.go` · `new: ErrLocked, Lock, Acquire, Release` · new
- **Do:** Add var ErrLocked = errors.New("lock: already held"); type Lock struct{path string; released bool}; Acquire(path string) (*Lock, error): os.MkdirAll(filepath.Dir(path),0o755), os.OpenFile(path, O_CREATE|O_EXCL|O_WRONLY, 0o600); on errors.Is(err, fs.ErrExist) return fmt.Errorf("%w: %s", ErrLocked, path); write strconv.Itoa(os.Getpid()) and close. (*Lock).Release() error: if released return nil, os.Remove(path), set released true.

```
func Acquire(path string) (*Lock, error)
func (l *Lock) Release() error
```

- **Expected:** Second Acquire on same path returns ErrLocked

## Acceptance criteria
- Acquire is exclusive
- Release frees the lock and is idempotent

## Definition of done
- package builds
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-173.md`

## Scan baseline
- Scan version: `v1`
- Scan tip: `9cda5131c65b08541fc685d8a0898d39a0e9e9fa`

## Links
- Evidence: EVD-036
- Requirement: REQ-088
- Unit (Act): UNIT-173
- Unit (Verify): UNIT-177
- Status: completed
- Change: UPDATE
