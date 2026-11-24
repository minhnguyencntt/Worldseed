# UNIT-587 — Act: Validate scene characters in validateWorld

## Summary
Check scene character ids, interaction dialogue and events in validateWorld.

## Description
In validateWorld's per-scene loop add a pass over scene.characters.

## How to act
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/src/content/loader.ts` · `validateWorld` · after the `for (const node of scene.dialogue)` loop (about L141)
- **Do:** Insert a loop over scene.characters ?? [] that pushes `unknown character: ${c.id}` when !characters.has(c.id), pushes `unknown dialogue: ${d}` when c.interaction?.dialogue is set and not in dialogueIds, and calls checkEvents(c.interaction?.events, ctx, errors).

```
for (const c of scene.characters ?? []) {
  if (!characters.has(c.id)) errors.push(`unknown character: ${c.id}`);
  const d = c.interaction?.dialogue;
  if (d !== undefined && !dialogueIds.has(d)) errors.push(`unknown dialogue: ${d}`);
  checkEvents(c.interaction?.events as GameEvent[] | undefined, ctx, errors);
}
```

- **Expected:** validateWorld returns the new errors for bad NPCs and none for valid ones.

## Acceptance criteria
- Unknown character id reported.
- Unknown interaction dialogue reported.
- Interaction events checked via checkEvents.

## Definition of done
- validateWorld extended
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-587.md`

## Scan baseline
- Scan version: `v1`
- Scan tip: `9cda5131c65b08541fc685d8a0898d39a0e9e9fa`

## Links
- Evidence: EVD-117
- Requirement: REQ-294
- Unit (Act): UNIT-587
- Unit (Verify): UNIT-590
- Status: approved
- Change: UPDATE
