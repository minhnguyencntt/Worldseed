# UNIT-238 — Act: Confirm server.New and adminRoundRoutes hold only round admin routes

## Summary
Ensure server.go has no execution, approve, retry or worker wiring

## Description
Read server.go and remove any execution/worker route, handler, store or import if present. Current source already has only five round routes in adminRoundRoutes; keep it that way.

## How to act
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `backend/internal/server/server.go` · `adminRoundRoutes` · L112-L121
- **Do:** Check that the returned slice lists only rt entries for rounds: POST /rounds, POST /rounds/{id}/open, POST /rounds/{id}/close, GET /rounds/{id}, GET /rounds/{id}/contributions; delete any other entry such as executions, approve or retry

```
no change expected; table already has five round entries
```

- **Expected:** Five round routes and nothing else

### Step 2 — `backend/internal/server/server.go` · `New` · L24-L102
- **Do:** Check that the import block and New body reference no internal/execution, storyforge/worker, execution store or execution handler; remove any found together with its r.Route entry

```
no change expected
```

- **Expected:** grep -in 'execution\|worker' backend/internal/server/server.go prints nothing

## Acceptance criteria
- adminRoundRoutes returns exactly five round routes
- server.go imports no execution or worker package

## Definition of done
- server.go contains no execution or worker reference
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-238.md`

## Scan baseline
- Scan version: `v1`
- Scan tip: `9cda5131c65b08541fc685d8a0898d39a0e9e9fa`

## Links
- Evidence: EVD-047
- Requirement: REQ-119
- Unit (Act): UNIT-238
- Unit (Verify): UNIT-241
- Status: completed
- Change: UPDATE
