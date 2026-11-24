# UNIT-076 — Act: Implement execution store, handlers and routes

## Summary
Create execution package and register routes

## Description
Add execution.go, handler.go and wire into the admin route group.

## How to act
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `backend/internal/execution/execution.go` · `new: Execution, FileStore, List, Get, Retry, Approve, ErrNotFound, ErrIllegalState` · new
- **Do:** Define Status constants QUEUED, RUNNING, AWAITING_APPROVAL, APPROVED, FAILED, COMPLETED and Execution with yaml tags id, world_id, round_id, status, error, updated_at; FileStore{Root, Git gitrepo.Committer, Now}; List reads development/executions/*.yaml sorted by id; Get validates id via safepath.Segment; Retry requires FAILED->QUEUED and clears error; Approve requires AWAITING_APPROVAL->APPROVED; both write atomically and Commit the path
- **Expected:** Transitions persisted and committed

### Step 2 — `backend/internal/execution/handler.go` · `new: Handler (List, Retry, Approve)` · new
- **Do:** Handler with Service interface{List,Retry,Approve}; List returns JSON array (empty array not null); Retry/Approve read chi param id and map ErrNotFound->404, ErrIllegalState->409, others 500
- **Expected:** HTTP statuses match

### Step 3 — `backend/internal/server/server.go` · `NewWithScheduler` · inside admin route group
- **Do:** Build execution.FileStore{Root: cfg.Storage.RepoPath, Git: same gitrepo.CLI, Now: time.Now} and register r.Get("/executions", eh.List), r.Post("/executions/{id}/retry", eh.Retry), r.Post("/executions/{id}/approve", eh.Approve)
- **Expected:** Routes are under the admin token group

## Acceptance criteria
- Illegal state returns ErrIllegalState mapped to 409
- Updated record is committed through the Committer

## Definition of done
- go build ./...
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-076.md`

## Scan baseline
- Scan version: `v1`
- Scan tip: `9cda5131c65b08541fc685d8a0898d39a0e9e9fa`

## Links
- Evidence: EVD-015
- Requirement: REQ-041
- Unit (Act): UNIT-076
- Unit (Verify): UNIT-082
- Status: completed
- Change: UPDATE
