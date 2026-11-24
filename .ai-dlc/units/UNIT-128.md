# UNIT-128 — Act: Add Reject control to ExecutionPanel

## Summary
Render Reject for AWAITING_APPROVAL executions

## Description
Add onReject prop and Reject button in ExecutionPanel.

## How to act
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/src/components/ExecutionPanel.tsx` · `ExecutionPanelProps` · L14-L20
- **Do:** Add optional prop onReject?: (id: string) => void after onRetry.

```
onReject?: (id: string) => void;
```

- **Expected:** Props interface accepts onReject

### Step 2 — `game/frontend/src/components/ExecutionPanel.tsx` · `ExecutionPanel` · L47-L90
- **Do:** Destructure onReject; add const canReject = execution?.status === 'AWAITING_APPROVAL' && onReject !== undefined; include canReject in the (canApprove || canRetry) condition; render a Reject button after Approve calling onReject?.(id ?? '').

```
{canReject && (
  <button type="button" onClick={() => onReject?.(id ?? '')}>
    Reject
  </button>
)}
```

- **Expected:** Reject button renders only for AWAITING_APPROVAL with a handler

## Acceptance criteria
- Reject appears only for AWAITING_APPROVAL with onReject
- Click calls onReject with the execution id

## Definition of done
- Button implemented
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-128.md`

## Scan baseline
- Scan version: `v1`
- Scan tip: `9cda5131c65b08541fc685d8a0898d39a0e9e9fa`

## Links
- Evidence: EVD-026
- Requirement: REQ-065
- Unit (Act): UNIT-128
- Unit (Verify): UNIT-131
- Status: completed
- Change: UPDATE
