# UNIT-118 — Act: Add the current-Round ExecutionInfo lookup

## Summary
Export findExecutionForRound and getCurrentRoundExecution

## Description
Add a pure filter helper and an async wrapper in client.ts that uses getCurrentRound and listExecutions.

## How to act
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/src/api/client.ts` · `new: findExecutionForRound` · after listExecutions
- **Do:** Add exported pure function findExecutionForRound(list: ExecutionInfo[], roundId: string): ExecutionInfo | undefined that filters by round_id === roundId and returns the entry with the greatest updated_at string, or undefined when none match.

```
export function findExecutionForRound(list: ExecutionInfo[], roundId: string): ExecutionInfo | undefined {
  return list
    .filter((e) => e.round_id === roundId)
    .reduce<ExecutionInfo | undefined>((best, e) => (!best || e.updated_at > best.updated_at ? e : best), undefined);
}
```

- **Expected:** Returns newest matching execution or undefined

### Step 2 — `game/frontend/src/api/client.ts` · `new: getCurrentRoundExecution` · after findExecutionForRound
- **Do:** Add exported async function getCurrentRoundExecution(token: string, worldId: string = WORLD_ID) that awaits getCurrentRound(worldId) and listExecutions(token), then returns findExecutionForRound(list, round.id).

```
export async function getCurrentRoundExecution(token: string, worldId: string = WORLD_ID): Promise<ExecutionInfo | undefined> {
  const [round, list] = await Promise.all([getCurrentRound(worldId), listExecutions(token)]);
  return findExecutionForRound(list, round.id);
}
```

- **Expected:** Resolves to the current Round's ExecutionInfo or undefined

## Acceptance criteria
- findExecutionForRound returns the newest matching execution or undefined
- getCurrentRoundExecution resolves the current round id then returns its execution

## Definition of done
- Both functions exported and type-check
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-118.md`

## Scan baseline
- Scan version: `v1`
- Scan tip: `9cda5131c65b08541fc685d8a0898d39a0e9e9fa`

## Links
- Evidence: EVD-023
- Requirement: REQ-060
- Unit (Act): UNIT-118
- Unit (Verify): UNIT-120
- Status: completed
- Change: NEW
