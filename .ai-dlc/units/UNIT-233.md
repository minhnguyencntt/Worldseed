# UNIT-233 — Act: Delete the internal/execution package

## Summary
Remove backend/internal/execution including handler.

## Description
Delete execution.go and handler.go (and their test files) from backend/internal/execution.

## How to act
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `backend/internal/execution` · `package execution` · L1-end
- **Do:** Run git rm -r backend/internal/execution to delete execution.go, handler.go, execution_test.go and handler_test.go.
- **Run:** `cd backend && git rm -r -q internal/execution && test ! -e internal/execution`
- **Expected:** backend/internal/execution does not exist.

## Acceptance criteria
- Given the change, when backend/internal/execution is listed, then it does not exist.
- Given gitrepo and safepath, when inspected, then they are unchanged.

## Definition of done
- Package deleted
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-233.md`

## Scan baseline
- Scan version: `v1`
- Scan tip: `9cda5131c65b08541fc685d8a0898d39a0e9e9fa`

## Links
- Evidence: EVD-046
- Requirement: REQ-117
- Unit (Act): UNIT-233
- Unit (Verify): UNIT-236
- Status: completed
- Change: UPDATE
