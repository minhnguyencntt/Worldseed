# UNIT-106 — Verify: Admin round handler status mapping unit tests

## Summary
Add Get and Open status tests with fakes

## Description
Extend rounds_test.go using fakeRounds and newRoundRouter.

## How to verify
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `backend/internal/admin/rounds_test.go` · `new: TestRoundHandler_GetAndOpenStatuses` · after L77
- **Do:** Using newRoundRouter and fakeRounds: (a) fakeRounds{round: world.Round{ID:"ROUND-0000001"}} then GET /rounds/ROUND-0000001 expects 200 and JSON ID ROUND-0000001; (b) fakeRounds{err: fmt.Errorf("get: %w", ErrNotFound)} then GET expects 404; (c) same err on POST /rounds/ROUND-0000001/open expects 404.
- **Run:** `cd backend && go test ./internal/admin -run TestRoundHandler_GetAndOpenStatuses`
- **Expected:** All three subtests pass

## Acceptance criteria
- GET /rounds/{id} success returns 200 with id
- GET with ErrNotFound returns 404
- POST open with wrapped ErrNotFound returns 404

## Definition of done
- Tests pass
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-106.md`

## Links
- Evidence: EVD-021
- Requirement: REQ-053
- Unit (Act): UNIT-104
- Unit (Verify): UNIT-106
- Status: completed
- Change: UPDATE
