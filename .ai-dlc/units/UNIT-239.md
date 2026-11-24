# UNIT-239 — Act: Confirm kept route registrations in server.New are untouched

## Summary
Keep player, world, contribution and round routes as they are

## Description
Read New and confirm the kept registrations remain; restore any that were altered during removal.

## How to act
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `backend/internal/server/server.go` · `New` · L43-L77
- **Do:** Confirm r.Get /api/v1/worlds/{id}/round/current -> wh.CurrentRound, r.Post /api/v1/contributions -> ch.Create, r.Get /api/v1/player/me/contributions -> ch.Mine, r.Get /api/v1/contributions/{id} -> ch.Get exist unchanged

```
no change expected
```

- **Expected:** Four kept routes present with the same handlers

### Step 2 — `backend/internal/server/server.go` · `New` · L79-L96
- **Do:** Confirm r.Route("/api/v1/admin") still applies admin.Middleware(cfg.Admin.Token) and loops adminRoundRoutes(rh) via ar.Method

```
no change expected
```

- **Expected:** Admin round routes mounted behind the token

## Acceptance criteria
- All kept routes remain registered with the same handlers
- Admin round routes stay mounted behind admin.Middleware

## Definition of done
- Kept registrations unchanged
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-239.md`

## Scan baseline
- Scan version: `v1`
- Scan tip: `9cda5131c65b08541fc685d8a0898d39a0e9e9fa`

## Links
- Evidence: EVD-047
- Requirement: REQ-120
- Unit (Act): UNIT-239
- Unit (Verify): UNIT-242
- Status: completed
- Change: UPDATE
