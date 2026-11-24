# UNIT-103 — Act: Confirm admin round routes are mounted from adminRoundRoutes in server.New

## Summary
Confirm New mounts adminRoundRoutes behind admin.Middleware and make no product change unless a route is missing

## Description
The code already registers the five round routes via adminRoutes(eh, rh) inside r.Route("/api/v1/admin"). Read it and keep it unchanged; add a missing route only if one of the five is absent.

## How to act
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `backend/internal/server/server.go` · `adminRoundRoutes` · L119-L127
- **Do:** Confirm the returned slice has exactly the five entries Create, Open, Close, Get, Contributions with the methods and patterns listed; change nothing if so.
- **Expected:** All five routes are present

### Step 2 — `backend/internal/server/server.go` · `New` · L102-L107
- **Do:** Confirm ar.Use(admin.Middleware(cfg.Admin.Token)) precedes the loop over adminRoutes(eh, rh) calling ar.Method(rt.Method, rt.Pattern, rt.Handler); change nothing if so.
- **Expected:** Routes are registered behind the token middleware

## Acceptance criteria
- Given server.go, when adminRoundRoutes is read, then POST /rounds, POST /rounds/{id}/open, POST /rounds/{id}/close, GET /rounds/{id} and GET /rounds/{id}/contributions are present
- Given New, when it builds the admin group, then admin.Middleware(cfg.Admin.Token) is applied before the routes

## Definition of done
- Five round routes confirmed mounted behind the middleware
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-103.md`

## Scan baseline
- Scan version: `v1`
- Scan tip: `9cda5131c65b08541fc685d8a0898d39a0e9e9fa`

## Links
- Evidence: EVD-021
- Requirement: REQ-052
- Unit (Act): UNIT-103
- Unit (Verify): UNIT-105
- Status: completed
- Change: UPDATE
