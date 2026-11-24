# UNIT-212 — Verify: StatusRecovering persistence unit test

## Summary
Unit test that RECOVERING round-trips through the store.

## Description
Add a test in store_test.go using a temp dir.

## How to verify
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `backend/worker/internal/store/store_test.go` · `new: TestStatusRecoveringRoundTrip` · after L136
- **Do:** Add TestStatusRecoveringRoundTrip: New(t.TempDir()), Save Execution{ID:"exec-1", RoundID:"ROUND-0000001", Status:StatusRecovering, Error:"boom"}; Get("exec-1") and assert Status equals "RECOVERING" and Error equals "boom".
- **Run:** `cd backend/worker && go test ./internal/store -run TestStatusRecoveringRoundTrip`
- **Expected:** Test passes.

## Acceptance criteria
- Execution with StatusRecovering is saved and read back equal
- Get returns Status equal to the string RECOVERING and the saved Error text

## Definition of done
- Test passes
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-212.md`

## Links
- Evidence: EVD-042
- Requirement: REQ-106
- Unit (Act): UNIT-209
- Unit (Verify): UNIT-212
- Status: completed
- Change: UPDATE
