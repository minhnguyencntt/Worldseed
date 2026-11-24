# UNIT-026 — Act: Remove duplicate world.ts module

## Summary
Delete src/content/world.ts so loader.ts is the only loader and validator.

## Description
Context: world.ts is only imported by tests/validator.test.ts; no src file imports it. Desired behavior: delete it. The surviving loader.ts validateWorld(world: LoadedWorld) already reports unknown scene (start scene and goto_scene), character (say and speaker), flag (set_flag, openWhenFlag, conditions) and object (discover) references. Expected result: no code path references content/world.

## How to act
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `backend/game/src/content/world.ts` · `module world.ts (loadWorld, validateWorld, LoadedWorld)` · L1-L166
- **Do:** Delete the whole file with `git rm backend/game/src/content/world.ts`; do not edit loader.ts in this step.
- **Run:** `test ! -e backend/game/src/content/world.ts && ! grep -rn "content/world" backend/game/src`
- **Expected:** File is absent and no src file references it.

## Acceptance criteria
- src/content/world.ts does not exist
- Nothing under backend/game/src imports content/world

## Definition of done
- world.ts removed; grep for content/world in src returns nothing
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-026.md`

## Scan baseline
- Scan version: `v1`
- Scan tip: `9cda5131c65b08541fc685d8a0898d39a0e9e9fa`

## Links
- Evidence: EVD-005
- Requirement: REQ-014
- Unit (Act): UNIT-026
- Unit (Verify): UNIT-028
- Status: completed
- Change: UPDATE
