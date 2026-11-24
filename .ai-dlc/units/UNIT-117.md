# UNIT-117 — Act: Add listExecutions to the admin client

## Summary
Export listExecutions from client.ts

## Description
Add listExecutions(token) after retryExecution in game/frontend/src/api/client.ts, using adminRequest and ExecutionInfo.

## How to act
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/src/api/client.ts` · `new: listExecutions` · after retryExecution, before const BASE_URL
- **Do:** Add exported function listExecutions(token: string) returning adminRequest<ExecutionInfo[]> for the path /api/v1/admin/executions with default init (GET).

```
/** Lists every execution (GET /api/v1/admin/executions). */
export function listExecutions(token: string): Promise<ExecutionInfo[]> {
  return adminRequest<ExecutionInfo[]>(token, '/api/v1/admin/executions');
}
```

- **Expected:** client.ts exports listExecutions and tsc --noEmit passes

## Acceptance criteria
- listExecutions(token) resolves to ExecutionInfo[] from GET /api/v1/admin/executions
- listExecutions rejects with ApiError on non-2xx

## Definition of done
- Function exported and type-checks
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-117.md`

## Scan baseline
- Scan version: `v1`
- Scan tip: `9cda5131c65b08541fc685d8a0898d39a0e9e9fa`

## Links
- Evidence: EVD-023
- Requirement: REQ-059
- Unit (Act): UNIT-117
- Unit (Verify): UNIT-119
- Status: completed
- Change: UPDATE
