# UNIT-135 — Act: Add onReject prop and Reject button to ExecutionPanel

## Summary
Edit ExecutionPanel.tsx to add onReject, canReject and the Reject button.

## Description
Modify game/frontend/src/components/ExecutionPanel.tsx: extend ExecutionPanelProps with onReject, destructure it, compute canReject, include it in the actions wrapper condition and render the button.

## How to act
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/src/components/ExecutionPanel.tsx` · `ExecutionPanelProps` · L15-L21
- **Do:** Add the optional callback prop onReject to ExecutionPanelProps directly after onRetry.

```
onReject?: (id: string) => void;
```

- **Expected:** ExecutionPanelProps accepts onReject; existing callers still type-check.

### Step 2 — `game/frontend/src/components/ExecutionPanel.tsx` · `ExecutionPanel` · L41-L88
- **Do:** Destructure onReject in the parameter list, add const canReject after canRetry, change the wrapper condition to include canReject, and render a Reject button after the Retry button.

```
const canReject = execution?.status === 'AWAITING_APPROVAL' && onReject !== undefined;
{(canApprove || canRetry || canReject) && (...)}
{canReject && (<button type="button" onClick={() => onReject?.(id ?? '')}>Reject</button>)}
```

- **Expected:** A Reject button renders for AWAITING_APPROVAL with onReject and is absent otherwise.

## Acceptance criteria
- Reject button renders only when status is AWAITING_APPROVAL and onReject is defined
- Clicking Reject calls onReject with the execution id (empty string when id missing, like Approve)

## Definition of done
- ExecutionPanel.tsx compiles with tsc --noEmit
- Reject gating matches the requirement
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-135.md`

## Scan baseline
- Scan version: `v1`
- Scan tip: `9cda5131c65b08541fc685d8a0898d39a0e9e9fa`

## Links
- Evidence: EVD-028
- Requirement: REQ-068
- Unit (Act): UNIT-135
- Unit (Verify): UNIT-136
- Status: completed
- Change: UPDATE
