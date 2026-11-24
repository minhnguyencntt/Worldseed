# UNIT-178 — Verify: JSON execution store unit tests

## Summary
Unit tests for round-trip, list, invalid ids and not found

## Description
Test store in t.TempDir().

## How to verify
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `backend/worker/internal/store/store_test.go` · `new: TestSaveGet_RoundTrip` · new
- **Do:** Save Execution{ID:'EXEC-1',RoundID:'ROUND-0000001',Status:StatusPending,Attempt:1,CreatedAt/UpdatedAt fixed UTC times}; Get('EXEC-1') equals the saved value (use .Equal on times).
- **Run:** `cd backend/worker && go test ./internal/store -run TestSaveGet_RoundTrip`
- **Expected:** Test TestSaveGet_RoundTrip passes (ok line printed)

### Step 2 — `backend/worker/internal/store/store_test.go` · `new: TestList_Sorted` · new
- **Do:** Save ids 'EXEC-3','EXEC-1','EXEC-2'; assert List returns IDs in order EXEC-1,EXEC-2,EXEC-3; assert List on a fresh empty dir returns zero items and nil error.
- **Run:** `cd backend/worker && go test ./internal/store -run TestList_Sorted`
- **Expected:** Test TestList_Sorted passes (ok line printed)

### Step 3 — `backend/worker/internal/store/store_test.go` · `new: TestInvalidIDAndNotFound` · new
- **Do:** Save and Get with ID '../evil' return errors.Is ErrInvalidID and no file appears in the parent of the temp dir; Get('EXEC-404') returns ErrNotFound.
- **Run:** `cd backend/worker && go test ./internal/store -run TestInvalidIDAndNotFound`
- **Expected:** Test TestInvalidIDAndNotFound passes (ok line printed)

## Acceptance criteria
- Round-trip asserted
- List ordering asserted
- ErrInvalidID and ErrNotFound asserted

## Definition of done
- tests pass
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-178.md`

## Links
- Evidence: EVD-036
- Requirement: REQ-089
- Unit (Act): UNIT-174
- Unit (Verify): UNIT-178
- Status: completed
- Change: UPDATE
