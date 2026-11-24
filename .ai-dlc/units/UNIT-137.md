# UNIT-137 — Act: Add onReject prop and Reject button to ExecutionPanel

## Summary
Add onReject prop, canReject flag and Reject button to ExecutionPanel

## Description
Edit ExecutionPanel.tsx: extend ExecutionPanelProps with onReject, compute canReject, include it in the actions container condition and render the Reject button after Approve.

## How to act
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/src/components/ExecutionPanel.tsx` · `ExecutionPanelProps` · L14-L20
- **Do:** Add the optional prop onReject after onRetry in the ExecutionPanelProps interface.

```
onRetry?: (id: string) => void;
  onReject?: (id: string) => void;
```

- **Expected:** ExecutionPanelProps accepts onReject without type errors

### Step 2 — `game/frontend/src/components/ExecutionPanel.tsx` · `ExecutionPanel` · L40-L100
- **Do:** Destructure onReject in the parameters, add const canReject = execution?.status === 'AWAITING_APPROVAL' && onReject !== undefined; change the container condition to (canApprove || canRetry || canReject), and render after the Approve button a Reject button.

```
{canReject && (
  <button type="button" onClick={() => onReject?.(id ?? '')}>
    Reject
  </button>
)}
```

- **Expected:** Reject button appears only for AWAITING_APPROVAL with onReject and calls onReject with the id

## Acceptance criteria
- Given AWAITING_APPROVAL and onReject, when rendered, then a Reject button calls onReject(id)
- Given no onReject or a different status, when rendered, then no Reject button is rendered

## Definition of done
- Code compiles with tsc --noEmit
- Reject gated as specified
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-137.md`

## Scan baseline
- Scan version: `v1`
- Scan tip: `9cda5131c65b08541fc685d8a0898d39a0e9e9fa`

## Links
- Evidence: EVD-029
- Requirement: REQ-069
- Unit (Act): UNIT-137
- Unit (Verify): UNIT-138
- Status: completed
- Change: NEW
