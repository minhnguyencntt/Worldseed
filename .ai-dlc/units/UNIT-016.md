# UNIT-016 — Verify: Me endpoint 401 and 200 unit tests

## Summary
Tests for me endpoint valid, missing, tampered, wrong-secret and expired tokens

## Description
Offline httptest table tests using fixed clock.

## How to verify
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `backend/internal/player/handler_test.go` · `new: TestMe_ValidToken` · new
- **Do:** With fixed Now, create token via Sign(secret,'p1',Now); GET Me with cookie; assert 200 and body id 'p1'
- **Run:** `cd backend && go test ./internal/player -run TestMe_ValidToken`
- **Expected:** Test passes

### Step 2 — `backend/internal/player/handler_test.go` · `new: TestMe_Unauthorized` · new
- **Do:** Table test: no cookie, token with last char flipped, token signed with secret 'other', token issued 2h ago with TTL 1h, and garbage 'xyz'; assert each returns 401
- **Run:** `cd backend && go test ./internal/player -run TestMe_Unauthorized`
- **Expected:** All subtests pass

### Step 3 — `backend/internal/server/server_test.go` · `new: TestSessionThenMe` · new
- **Do:** Using server.New and httptest.NewRecorder (no live port), POST session, copy the Set-Cookie into a GET /api/v1/player/me request, assert 200 and the same id
- **Run:** `cd backend && go test ./internal/server -run TestSessionThenMe`
- **Expected:** Test passes

## Acceptance criteria
- Given a valid token, when Me is called, then 200 and the player id are asserted
- Given missing, tampered, wrong-secret, expired or garbage tokens, when Me is called, then 401 is asserted

## Definition of done
- Tests pass offline
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-016.md`

## Links
- Evidence: EVD-003
- Requirement: REQ-008
- Unit (Act): UNIT-013
- Unit (Verify): UNIT-016
- Status: completed
- Change: UPDATE
