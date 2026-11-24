# UNIT-013 — Act: Implement player me endpoint

## Summary
GET /api/v1/player/me with cookie verification

## Description
Add Me handler to player.Handler verifying cookie and register route.

## How to act
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `backend/internal/player/handler.go` · `Handler.Me` · after CreateSession
- **Do:** Add method Me(w, r): read cookie h.CookieName; if missing or player.Verify(h.Secret, value, h.Now(), h.TTL) errors, write 401 JSON {"error":"unauthorized"}; else write 200 JSON {"id":id}
- **Expected:** Valid cookie gives 200; others 401

### Step 2 — `backend/internal/server/server.go` · `New` · after the session route
- **Do:** Register r.Get("/api/v1/player/me", ph.Me)

```
r.Get("/api/v1/player/me", ph.Me)
```

- **Expected:** Route reachable

## Acceptance criteria
- Given a valid session cookie, when GET /api/v1/player/me, then 200 is returned
- Given a missing or invalid cookie, when requested, then 401 is returned

## Definition of done
- Build succeeds
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-013.md`

## Scan baseline
- Scan version: `v1`
- Scan tip: `9cda5131c65b08541fc685d8a0898d39a0e9e9fa`

## Links
- Evidence: EVD-003
- Requirement: REQ-008
- Unit (Act): UNIT-013
- Unit (Verify): UNIT-016
- Status: completed
- Change: NEW
