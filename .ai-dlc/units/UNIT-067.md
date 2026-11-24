# UNIT-067 — Act: Move the Mine route to /api/v1/player/me/contributions

## Summary
Re-register ch.Mine at the new path in server.New

## Description
In backend/internal/server/server.go replace the legacy Mine registration with the new path so the player history is served at /api/v1/player/me/contributions.

## How to act
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `backend/internal/server/server.go` · `New` · L76-L78
- **Do:** Change the r.Get registration of ch.Mine from /api/v1/contributions/mine to /api/v1/player/me/contributions, keeping it registered after ch is constructed

```
r.Get("/api/v1/contributions/mine", ch.Mine) -> r.Get("/api/v1/player/me/contributions", ch.Mine)
```

- **Expected:** cd backend && go build ./... succeeds and only the new path routes to Mine

## Acceptance criteria
- Given server.New, when routes are registered, then GET /api/v1/player/me/contributions maps to ch.Mine
- Given server.New, when routes are registered, then /api/v1/contributions/mine is not registered

## Definition of done
- server.go registers the new path only
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-067.md`

## Scan baseline
- Scan version: `v1`
- Scan tip: `9cda5131c65b08541fc685d8a0898d39a0e9e9fa`

## Links
- Evidence: EVD-013
- Requirement: REQ-034
- Unit (Act): UNIT-067
- Unit (Verify): UNIT-068
- Status: completed
- Change: UPDATE
