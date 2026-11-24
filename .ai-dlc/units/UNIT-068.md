# UNIT-068 — Verify: Player contributions route unit tests

## Summary
Unit tests for new and legacy contribution history paths

## Description
Add subtests to backend/internal/server/server_test.go using httptest and a temp-dir repo, proving the new path serves Mine and the legacy path no longer does.

## How to verify
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `backend/internal/server/server_test.go` · `new: TestNew_PlayerContributionsRoute` · after L125
- **Do:** Build cfg like TestNew_RegistersRoutes; create a session via POST /api/v1/player/session and copy its cookies; add subtests: GET /api/v1/player/me/contributions?round_id=ROUND-0000001 with cookies expects 200 and body []; GET /api/v1/contributions/mine?round_id=ROUND-0000001 with cookies expects 404; GET /api/v1/player/me/contributions?round_id=ROUND-0000001 without cookies expects 401

```
h.ServeHTTP(rec, req); if rec.Code != want { t.Fatalf("status = %d, want %d", rec.Code, want) }
```

- **Run:** `cd backend && go test ./internal/server -run TestNew_PlayerContributionsRoute`
- **Expected:** All three subtests pass

## Acceptance criteria
- Given a session cookie and round_id, when the new path is requested, then 200 and an empty JSON array body
- Given a session cookie, when the legacy path is requested, then 404
- Given no cookie, when the new path is requested, then 401

## Definition of done
- Test passes
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-068.md`

## Links
- Evidence: EVD-013
- Requirement: REQ-034
- Unit (Act): UNIT-067
- Unit (Verify): UNIT-068
- Status: completed
- Change: UPDATE
