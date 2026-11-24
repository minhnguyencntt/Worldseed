# UNIT-069 — Act: Move the current round route to /round/current

## Summary
Change the registered path in server.New

## Description
In backend/internal/server/server.go line 46, change the Chi route path from /api/v1/worlds/{id}/rounds/current to /api/v1/worlds/{id}/round/current, keeping the wh.CurrentRound handler.

## How to act
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `backend/internal/server/server.go` · `server.New` · L46
- **Do:** Replace the path string passed to r.Get for wh.CurrentRound, changing 'rounds/current' to 'round/current'.

```
r.Get("/api/v1/worlds/{id}/rounds/current", wh.CurrentRound) -> r.Get("/api/v1/worlds/{id}/round/current", wh.CurrentRound)
```

- **Expected:** The route is registered at /api/v1/worlds/{id}/round/current and the package compiles with go build ./...

## Acceptance criteria
- server.go registers GET /api/v1/worlds/{id}/round/current to wh.CurrentRound
- server.go no longer registers /rounds/current

## Definition of done
- go build ./... succeeds in backend
- Route string changed
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-069.md`

## Scan baseline
- Scan version: `v1`
- Scan tip: `9cda5131c65b08541fc685d8a0898d39a0e9e9fa`

## Links
- Evidence: EVD-014
- Requirement: REQ-035
- Unit (Act): UNIT-069
- Unit (Verify): UNIT-070
- Status: completed
- Change: UPDATE
