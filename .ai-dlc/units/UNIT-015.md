# UNIT-015 — Verify: Session endpoint and token unit tests

## Summary
Tests for token and session cookie attributes

## Description
Offline httptest and pure-function tests for token Sign/Verify and cookie attributes.

## How to verify
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `backend/internal/player/token_test.go` · `new: TestSignVerifyRoundTrip` · new
- **Do:** Sign with secret 's1' id 'abc' at fixed time T; Verify at T+1m with ttl 1h; assert returned id 'abc' and nil error
- **Run:** `cd backend && go test ./internal/player -run TestSignVerifyRoundTrip`
- **Expected:** Test passes

### Step 2 — `backend/internal/player/handler_test.go` · `new: TestCreateSession_CookieAndID` · new
- **Do:** Build Handler{Secret 's1', CookieName 'sf_session', TTL 1h, Secure true}; httptest POST to CreateSession; assert status 201, id matches ^[0-9a-f]{32}$, cookie named sf_session has HttpOnly, Secure, Path '/', MaxAge 3600, SameSite Lax, and cookie value verifies to the body id
- **Run:** `cd backend && go test ./internal/player -run TestCreateSession_CookieAndID`
- **Expected:** Test passes

### Step 3 — `backend/internal/player/handler_test.go` · `new: TestCreateSession_UniqueIDs` · new
- **Do:** Call CreateSession twice and assert the two ids differ
- **Run:** `cd backend && go test ./internal/player -run TestCreateSession_UniqueIDs`
- **Expected:** Test passes

## Acceptance criteria
- Cookie attributes asserted
- Unique ids asserted

## Definition of done
- Tests pass offline
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-015.md`

## Links
- Evidence: EVD-003
- Requirement: REQ-007
- Unit (Act): UNIT-012
- Unit (Verify): UNIT-015
- Status: completed
- Change: UPDATE
