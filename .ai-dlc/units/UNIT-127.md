# UNIT-127 — Act: Add rejectExecution to the admin client

## Summary
Add rejectExecution next to retryExecution in client.ts

## Description
Implement rejectExecution(token, id) mirroring approveExecution.

## How to act
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/src/api/client.ts` · `new: rejectExecution` · after L105
- **Do:** Add exported function rejectExecution(token: string, id: string): Promise<ExecutionInfo> calling adminRequest with path /api/v1/admin/executions/${encodeURIComponent(id)}/reject and method 'POST'.

```
/** Rejects an AWAITING_APPROVAL execution (POST /api/v1/admin/executions/{id}/reject). */
export function rejectExecution(token: string, id: string): Promise<ExecutionInfo> {
  return adminRequest<ExecutionInfo>(token, `/api/v1/admin/executions/${encodeURIComponent(id)}/reject`, {
    method: 'POST',
  });
}
```

- **Expected:** rejectExecution is importable from src/api/client and type-checks

## Acceptance criteria
- rejectExecution is exported and POSTs to /api/v1/admin/executions/{id}/reject
- It returns Promise<ExecutionInfo>

## Definition of done
- Function added and tsc passes
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-127.md`

## Scan baseline
- Scan version: `v1`
- Scan tip: `9cda5131c65b08541fc685d8a0898d39a0e9e9fa`

## Links
- Evidence: EVD-026
- Requirement: REQ-064
- Unit (Act): UNIT-127
- Unit (Verify): UNIT-130
- Status: completed
- Change: UPDATE
