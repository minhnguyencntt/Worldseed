# UNIT-192 — Verify: store.ValidateID unit tests

## Summary
Unit tests for exported ValidateID

## Description
Prove ValidateID accepts safe ids and rejects unsafe ones.

## How to verify
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `backend/worker/internal/store/store_test.go` · `new: TestValidateID` · after L97
- **Do:** Add table test calling ValidateID with inputs "", "../evil", "a/b", ".hidden" asserting errors.Is(err, ErrInvalidID), and "exec-1.2", "EXEC_1" asserting nil
- **Run:** `cd backend/worker && go test ./internal/store -run TestValidateID`
- **Expected:** TestValidateID passes

## Acceptance criteria
- Unsafe ids wrap ErrInvalidID
- Safe ids return nil

## Definition of done
- Test passes
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-192.md`

## Links
- Evidence: EVD-039
- Requirement: REQ-095
- Unit (Act): UNIT-189
- Unit (Verify): UNIT-192
- Status: completed
- Change: UPDATE
