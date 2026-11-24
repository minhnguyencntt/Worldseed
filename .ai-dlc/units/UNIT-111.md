# UNIT-111 — Act: Add Approve and Retry controls to ExecutionPanel

## Summary
Client calls and status-conditional buttons

## Description
Add approveExecution and retryExecution client functions and render the buttons in ExecutionPanel, wired from AdminApp.

## How to act
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/src/api/client.ts` · `new: approveExecution, retryExecution` · after listExecutions
- **Do:** Add approveExecution(token,id) and retryExecution(token,id) POSTing /api/v1/admin/executions/{id}/approve and /retry via adminRequest, returning ExecutionInfo
- **Expected:** Calls carry the Bearer header

### Step 2 — `game/frontend/src/components/ExecutionPanel.tsx` · `ExecutionPanel` · from ACT-4
- **Do:** Add props onApprove and onRetry and optional actionError; render button 'Approve' when execution.status==='AWAITING_APPROVAL' and button 'Retry' when 'FAILED', each calling its prop with execution.id; render actionError in role='alert'
- **Expected:** Conditional buttons

### Step 3 — `game/frontend/src/components/AdminApp.tsx` · `AdminApp` · from ACT-4
- **Do:** Pass onApprove/onRetry that call approveExecution/retryExecution(token,id), then reload executions; catch ApiError and set actionError to its message
- **Expected:** Click triggers the endpoint and refresh

## Acceptance criteria
- Buttons conditional on status
- Click calls the endpoint and reloads
- 409 message shown

## Definition of done
- tsc passes
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-111.md`

## Scan baseline
- Scan version: `v1`
- Scan tip: `9cda5131c65b08541fc685d8a0898d39a0e9e9fa`

## Links
- Evidence: EVD-022
- Requirement: REQ-058
- Unit (Act): UNIT-111
- Unit (Verify): UNIT-116
- Status: completed
- Change: NEW
