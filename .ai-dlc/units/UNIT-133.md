# UNIT-133 — Act: Add rejectExecution to the admin client

## Summary
Export rejectExecution in client.ts after retryExecution.

## Description
Add rejectExecution(token, id) to game/frontend/src/api/client.ts after retryExecution (ends near L105), copying the approveExecution pattern with the /reject path.

## How to act
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/src/api/client.ts` · `new: rejectExecution` · after L105
- **Do:** Add an exported function rejectExecution(token: string, id: string) that returns adminRequest<ExecutionInfo> for the path /api/v1/admin/executions/${encodeURIComponent(id)}/reject with { method: 'POST' }, placed directly after retryExecution and before listExecutions.

```
/** Rejects an AWAITING_APPROVAL execution (POST /api/v1/admin/executions/{id}/reject). */
export function rejectExecution(token: string, id: string): Promise<ExecutionInfo> {
  return adminRequest<ExecutionInfo>(token, `/api/v1/admin/executions/${encodeURIComponent(id)}/reject`, {
    method: 'POST',
  });
}
```

- **Expected:** client.ts exports rejectExecution and npx tsc --noEmit in game/frontend passes.

## Acceptance criteria
- Given the file is saved, when tsc --noEmit runs, then rejectExecution is exported with signature (token: string, id: string) => Promise<ExecutionInfo>.
- Given a call, when it runs, then it delegates to adminRequest with method POST and the /reject path.

## Definition of done
- rejectExecution exported and type-checks.
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-133.md`

## Scan baseline
- Scan version: `v1`
- Scan tip: `9cda5131c65b08541fc685d8a0898d39a0e9e9fa`

## Links
- Evidence: EVD-027
- Requirement: REQ-067
- Unit (Act): UNIT-133
- Unit (Verify): UNIT-134
- Status: completed
- Change: NEW
