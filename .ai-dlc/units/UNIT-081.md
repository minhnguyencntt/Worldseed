# UNIT-081 — Verify: Admin round handlers and route auth unit tests

## Summary
Handler tests with fake service and router 401 test

## Description
Test status mapping with a fake RoundService and auth on the mounted router.

## How to verify
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `backend/internal/admin/rounds_test.go` · `new: TestRoundHandler_Statuses` · new
- **Do:** Fake RoundService returning configurable round/error; mount handlers on chi; assert POST /rounds body {"world_id":"w"} -> 201 JSON with status SCHEDULED; Close returning round.ErrIllegalTransition -> 409; Get returning round.ErrNotFound -> 404; malformed JSON -> 400; Contributions returns the fake list as JSON
- **Run:** `cd backend && go test ./internal/admin -run TestRoundHandler`
- **Expected:** TestRoundHandler passes (go test reports PASS)

### Step 2 — `backend/internal/server/server_test.go` · `new: TestNew_AdminRoundsRequireToken` · after L193
- **Do:** Build the handler via New with Admin.Token "tok" and temp RepoPath; for POST /api/v1/admin/rounds, POST /api/v1/admin/rounds/ROUND-0000001/open, POST .../close, GET .../ROUND-0000001, GET .../contributions assert 401 without header and not 401 with "Authorization: Bearer tok"
- **Run:** `cd backend && go test ./internal/server -run TestNew_AdminRoundsRequireToken`
- **Expected:** Router auth test passes (go test reports PASS)

## Acceptance criteria
- Create 201, Close 200, illegal transition 409, unknown 404
- Router without token returns 401 for each admin round route

## Definition of done
- Tests pass
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-081.md`

## Links
- Evidence: EVD-015
- Requirement: REQ-040
- Unit (Act): UNIT-075
- Unit (Verify): UNIT-081
- Status: completed
- Change: UPDATE
