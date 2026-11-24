# UNIT-603 — Act: Confirm validateWorld checks every scene character id

## Summary
Confirm loader.ts reports unknown scene characters with an indexed path.

## Description
Read validateWorld in game/src/content/loader.ts and confirm the scene characters loop exists and builds the path message. Edit only if it is missing or differs.

## How to act
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/src/content/loader.ts` · `validateWorld` · L142-L146
- **Do:** Check that (scene.characters ?? []).forEach pushes the template message when !characters.has(character.id); restore it if missing, make no other edit.

```
errors.push(`scenes[${scene.id}].characters[${i}].id: unknown character ${character.id}`);
```

- **Run:** `cd game && grep -n "characters\[\${i}\]" src/content/loader.ts`
- **Expected:** One matching line inside validateWorld.

## Acceptance criteria
- validateWorld iterates scene.characters ?? []
- The message format is scenes[<sceneId>].characters[<i>].id: unknown character <id>

## Definition of done
- Loop present with the exact message
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-603.md`

## Scan baseline
- Scan version: `v1`
- Scan tip: `9cda5131c65b08541fc685d8a0898d39a0e9e9fa`

## Links
- Evidence: EVD-122
- Requirement: REQ-302
- Unit (Act): UNIT-603
- Unit (Verify): UNIT-606
- Status: completed
- Change: UPDATE
