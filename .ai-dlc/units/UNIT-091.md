# UNIT-091 — Act: Confirm admin round route registration in server.New

## Summary
Verify the five admin round routes are registered behind the middleware and fix any gap

## Description
Read server.New admin group and confirm POST /rounds, open, close, GET /rounds/{id} and contributions map to rh.Create, Open, Close, Get, Contributions; correct any missing route.

## How to act
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `backend/internal/server/server.go` · `New (admin r.Route block)` · L103-L115
- **Do:** Confirm ar.Post("/rounds", rh.Create), ar.Post("/rounds/{id}/open", rh.Open), ar.Post("/rounds/{id}/close", rh.Close), ar.Get("/rounds/{id}", rh.Get) and ar.Get("/rounds/{id}/contributions", rh.Contributions) exist after ar.Use(admin.Middleware(cfg.Admin.Token)); add any that is missing.

```
ar.Post("/rounds/{id}/open", rh.Open)
```

- **Expected:** All five routes present; go build ./... succeeds

## Acceptance criteria
- All five round routes registered in the admin group
- go build ./... succeeds

## Definition of done
- Routes registered; build passes
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-091.md`

## Scan baseline
- Scan version: `v1`
- Scan tip: `9cda5131c65b08541fc685d8a0898d39a0e9e9fa`

## Links
- Evidence: EVD-018
- Requirement: REQ-046
- Unit (Act): UNIT-091
- Unit (Verify): UNIT-093
- Status: completed
- Change: UPDATE
