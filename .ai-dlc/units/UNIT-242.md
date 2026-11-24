# UNIT-242 — Verify: Kept contribution, player and round routes unchanged unit tests

## Summary
Unit tests prove kept routes still reach their handlers

## Description
Run and, where missing, extend existing kept-route tests; mocked Git and temp dirs only.

## How to verify
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `backend/internal/server/server_test.go` · `TestNew_RegistersRoutes` · L95-L128
- **Do:** Confirm it asserts the POST /api/v1/contributions route is registered (status not 404/405); add a row for GET /api/v1/contributions/{id} if absent, asserting not 404 for the route pattern with an unknown id returns the handler's own not-found JSON

```
add case {"GET","/api/v1/contributions/unknown"}
```

- **Run:** `cd backend && go test ./internal/server -run 'TestNew_RegistersRoutes|TestNew_PlayerContributionsRoute|TestNew_CurrentRoundRoute'`
- **Expected:** All three tests pass

### Step 2 — `backend/internal/server/server_test.go` · `TestNew_AdminRoundRoutesReturnHandlerStatuses` · L337-L409
- **Do:** Run unchanged to prove admin round statuses are the same
- **Run:** `cd backend && go test ./internal/server -run 'TestNew_AdminRoundRoutesReturnHandlerStatuses|TestNew_AdminRoundsRequireToken'`
- **Expected:** Both pass

## Acceptance criteria
- Contribution, player and round routes return their existing statuses
- GET /api/v1/contributions/{id} with an unknown id reaches the handler, not the router 404

## Definition of done
- Kept-route tests pass
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-242.md`

## Links
- Evidence: EVD-047
- Requirement: REQ-120
- Unit (Act): UNIT-239
- Unit (Verify): UNIT-242
- Status: completed
- Change: UPDATE
