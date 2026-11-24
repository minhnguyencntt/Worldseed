# UNIT-093 — Verify: Admin round route auth and mounting unit tests

## Summary
Unit tests prove admin round routes require the token and are mounted

## Description
Run and, where absent, add tests in server_test.go that exercise the admin round routes with an in-memory httptest recorder and a temp dir repo.

## How to verify
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `backend/internal/server/server_test.go` · `TestNew_AdminRoundsRequireToken` · L240-L279
- **Do:** Confirm the test sends each of the five admin round requests without Authorization and asserts status 401; add any missing endpoint case.
- **Run:** `cd backend && go test ./internal/server -run TestNew_AdminRoundsRequireToken`
- **Expected:** Test passes, all 401

### Step 2 — `backend/internal/server/server_test.go` · `TestNew_AdminRoundsAreMounted` · L288-L329
- **Do:** Confirm the test sends Bearer tok to each of the five endpoints against a temp-dir repo holding round-0000001 and asserts status != 404.
- **Run:** `cd backend && go test ./internal/server -run TestNew_AdminRoundsAreMounted`
- **Expected:** Test passes for all five subtests

## Acceptance criteria
- Missing token returns 401 on each route
- Bearer tok returns a non-404 response on each route

## Definition of done
- Tests pass
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-093.md`

## Links
- Evidence: EVD-018
- Requirement: REQ-046
- Unit (Act): UNIT-091
- Unit (Verify): UNIT-093
- Status: completed
- Change: UPDATE
