# UNIT-151 — Act: Confirm AdminApp 401 branch covers Retry and Reject

## Summary
Confirm runExecutionAction sends every 401 through handleError

## Description
Read AdminApp.runExecutionAction and confirm the 401 branch applies to approve, retry and reject alike; no code change is expected unless a gap is found.

## How to act
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/src/components/AdminApp.tsx` · `AdminApp::runExecutionAction` · L92-L107
- **Do:** Confirm the catch block calls handleError(err) and returns when err is an ApiError with status 401, for any action function passed in; change nothing if so.
- **Expected:** Retry, Approve and Reject all share the same 401 path

## Acceptance criteria
- Given any execution action returns 401, when runExecutionAction catches it, then handleError clears the token and sets gateError 'Invalid token'
- Given a non-401 error, when caught, then handleError is not called

## Definition of done
- 401 branch confirmed to be action-agnostic
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-151.md`

## Scan baseline
- Scan version: `v1`
- Scan tip: `9cda5131c65b08541fc685d8a0898d39a0e9e9fa`

## Links
- Evidence: EVD-033
- Requirement: REQ-076
- Unit (Act): UNIT-151
- Unit (Verify): UNIT-153
- Status: completed
- Change: UPDATE
