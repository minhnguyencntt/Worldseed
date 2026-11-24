# UNIT-600 — Act: Check scene characters in validateWorld

## Summary
Add the scene character reference check inside the per-scene loop of validateWorld

## Description
In game/src/content/loader.ts validateWorld, inside the for (const scene of world.scenes) loop, iterate scene.characters ?? [] with index and push a path-tagged error for ids not in the existing characters Set.

## How to act
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/src/content/loader.ts` · `validateWorld` · L128-L159
- **Do:** Inside the scene loop, after the dialogue loop (after L140) and before the objects loop, add a loop over (scene.characters ?? []) with index i that pushes an error when !characters.has(character.id).

```
(scene.characters ?? []).forEach((character, i) => {
  if (!characters.has(character.id)) {
    errors.push(`scenes[${scene.id}].characters[${i}].id: unknown character ${character.id}`);
  }
});
```

- **Expected:** validateWorld returns the path-tagged message for each scene character id missing from world.characters

## Acceptance criteria
- Unknown scene character ids push scenes[<sceneId>].characters[<index>].id: unknown character <id>
- Known ids and scenes without characters push nothing

## Definition of done
- validateWorld reports unknown scene character ids
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-600.md`

## Scan baseline
- Scan version: `v1`
- Scan tip: `9cda5131c65b08541fc685d8a0898d39a0e9e9fa`

## Links
- Evidence: EVD-121
- Requirement: REQ-300
- Unit (Act): UNIT-600
- Unit (Verify): UNIT-601
- Status: completed
- Change: NEW
