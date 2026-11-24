# UNIT-227 — Verify: Provider factory unit tests

## Summary
Unit tests for provider.New

## Description
Assert kind selection and errors.

## How to verify
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `backend/worker/internal/provider/provider_test.go` · `new: TestNew` · new
- **Do:** Table test over kinds: New("mock", nil) returns a value of type Mock; New("claude", &fakeExec{}) returns *Claude; New("gpt", nil) returns an error whose text contains gpt; New("claude", nil) returns an error. Use type assertions.
- **Run:** `cd backend/worker && go test ./internal/provider -run 'TestNew$'`
- **Expected:** TestNew passes

## Acceptance criteria
- mock gives Mock
- claude gives Claude
- unknown kind errors naming it
- claude with nil Exec errors

## Definition of done
- tests pass
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-227.md`

## Links
- Evidence: EVD-044
- Requirement: REQ-113
- Unit (Act): UNIT-224
- Unit (Verify): UNIT-227
- Status: completed
- Change: UPDATE
