# UNIT-174 — Act: Implement the JSON execution store

## Summary
Add store.Store with Save, Get, List and id validation

## Description
Implement atomic JSON persistence of executions.

## How to act
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `backend/worker/internal/store/store.go` · `new: Execution, Status consts, Store, New` · new
- **Do:** Define type Status string with consts StatusPending, StatusRunning, StatusAwaitingApproval, StatusCompleted, StatusFailed; Execution{ID, RoundID string; Status Status; Attempt int; Error string; CreatedAt, UpdatedAt time.Time} with json tags id, round_id, status, attempt, error, created_at, updated_at; type Store struct{dir string}; New(dir string) *Store; vars ErrInvalidID, ErrNotFound.

```
func New(dir string) *Store
```

- **Expected:** Types compile

### Step 2 — `backend/worker/internal/store/store.go` · `new: (*Store).Save` · new
- **Do:** Validate e.ID against regexp ^[A-Za-z0-9][A-Za-z0-9._-]*$ and reject ids containing '..' returning ErrInvalidID; MkdirAll(dir); json.MarshalIndent e; write to os.CreateTemp(dir, '.tmp-*'), close, os.Rename to dir/<id>.json.

```
func (s *Store) Save(e Execution) error
```

- **Expected:** <id>.json exists after Save

### Step 3 — `backend/worker/internal/store/store.go` · `new: (*Store).Get, (*Store).List` · new
- **Do:** Get(id) validates id, reads dir/<id>.json, returns ErrNotFound on fs.ErrNotExist, json.Unmarshal into Execution. List() reads dir entries ending in .json (empty slice when dir missing), loads each via Get and returns them sorted by ID with sort.Slice.

```
func (s *Store) Get(id string) (Execution, error)
func (s *Store) List() ([]Execution, error)
```

- **Expected:** Round-trip returns identical records, sorted by ID

## Acceptance criteria
- Save is atomic
- Invalid ids are rejected

## Definition of done
- package builds
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-174.md`

## Scan baseline
- Scan version: `v1`
- Scan tip: `9cda5131c65b08541fc685d8a0898d39a0e9e9fa`

## Links
- Evidence: EVD-036
- Requirement: REQ-089
- Unit (Act): UNIT-174
- Unit (Verify): UNIT-178
- Status: completed
- Change: UPDATE
