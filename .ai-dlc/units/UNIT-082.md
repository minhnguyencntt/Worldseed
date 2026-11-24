# UNIT-082 — Verify: Execution store and handler unit tests

## Summary
Store transitions with fake committer and handler status mapping

## Description
Test Retry/Approve legality, persistence and HTTP mapping.

## How to verify
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `backend/internal/execution/execution_test.go` · `new: TestRetry, TestApprove, TestList` · new
- **Do:** Write EXE-1 FAILED and EXE-2 AWAITING_APPROVAL yaml into t.TempDir; Retry(EXE-1) -> QUEUED and committer saw development/executions/EXE-1.yaml; Retry(EXE-2) -> ErrIllegalState; Approve(EXE-2) -> APPROVED; Approve("../x") errors; List returns two sorted
- **Run:** `cd backend && go test ./internal/execution -run 'TestRetry|TestApprove|TestList'`
- **Expected:** Store tests pass (go test reports PASS)

### Step 2 — `backend/internal/execution/handler_test.go` · `new: TestHandler_Statuses` · new
- **Do:** Fake Service returning nil, ErrNotFound, ErrIllegalState; call Retry and Approve through chi router and assert 200, 404, 409; empty List body decodes to []
- **Run:** `cd backend && go test ./internal/execution -run TestHandler`
- **Expected:** TestHandler passes (go test reports PASS)

## Acceptance criteria
- Retry FAILED->QUEUED, Approve AWAITING_APPROVAL->APPROVED, others ErrIllegalState
- Unsafe id returns ErrNotFound-class error
- Handler maps 200/404/409 and list is a JSON array

## Definition of done
- Tests pass
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-082.md`

## Links
- Evidence: EVD-015
- Requirement: REQ-041
- Unit (Act): UNIT-076
- Unit (Verify): UNIT-082
- Status: completed
- Change: UPDATE
