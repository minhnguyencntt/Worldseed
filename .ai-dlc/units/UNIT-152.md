# UNIT-152 — Act: Confirm rejectExecution encoding and non-401 failure display

## Summary
Confirm client and AdminApp code paths for Reject failures

## Description
Read rejectExecution and the non-401 branch of runExecutionAction and confirm they behave as the requirement states; no change expected.

## How to act
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/src/api/client.ts` · `rejectExecution` · L123-L127
- **Do:** Confirm the path uses encodeURIComponent(id) and method 'POST'; change nothing if so.
- **Expected:** URL is /api/v1/admin/executions/{encoded id}/reject

### Step 2 — `game/frontend/src/components/AdminApp.tsx` · `AdminApp::runExecutionAction` · L103-L106
- **Do:** Confirm non-401 errors call setActionError(err.message) and setActionDetail(err.detail for ApiError); change nothing if so.
- **Expected:** Error text reaches ExecutionPanel props

## Acceptance criteria
- Given a non-401 failure, when caught, then actionError and actionDetail are set
- Given an id, when rejectExecution builds the URL, then it uses encodeURIComponent

## Definition of done
- Code paths confirmed
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-152.md`

## Scan baseline
- Scan version: `v1`
- Scan tip: `9cda5131c65b08541fc685d8a0898d39a0e9e9fa`

## Links
- Evidence: EVD-033
- Requirement: REQ-077
- Unit (Act): UNIT-152
- Unit (Verify): UNIT-154
- Status: completed
- Change: UPDATE
