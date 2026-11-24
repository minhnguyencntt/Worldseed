# UNIT-598 — Act: Check scene characters in validateWorld

## Summary
Add scene character id loop to validateWorld.

## Description
Add a loop over scene.characters ?? [] inside the per-scene loop of validateWorld that pushes a path-tagged error for ids absent from the characters Set.

## How to act
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/src/content/loader.ts` · `validateWorld` · after L140
- **Do:** Inside `for (const scene of world.scenes)`, after the dialogue node loop, add a loop over scene.characters ?? [] with index that pushes a path-tagged error when the character id is not in the `characters` Set.

```
(scene.characters ?? []).forEach((c, i) => {
  if (!characters.has(c.id)) errors.push(`scenes.${scene.id}.characters.${i}.id: unknown character: ${c.id}`);
});
```

- **Expected:** validateWorld returns 'scenes.bedroom.characters.1.id: unknown character: ghost' for an undeclared scene character

## Acceptance criteria
- validateWorld returns the path-tagged error for an unknown scene character id
- Worlds with valid scene characters return no new errors

## Definition of done
- Loop added and the existing the-boys-room content still validates
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-598.md`

## Scan baseline
- Scan version: `v1`
- Scan tip: `9cda5131c65b08541fc685d8a0898d39a0e9e9fa`

## Links
- Evidence: EVD-120
- Requirement: REQ-299
- Unit (Act): UNIT-598
- Unit (Verify): UNIT-599
- Status: approved
- Change: UPDATE
