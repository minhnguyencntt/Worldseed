# UNIT-562 — Verify: Build test types scene object callback

## Summary
Type 'o' in bootSceneBuild and run preload tests

## Description
Type the flatMap callback and confirm suite passes with mocked sceneSpec.

## How to verify
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/tests/bootSceneBuild.test.ts` · `describe BootScene source has no hardcoded scene content` · L138
- **Do:** Annotate the flatMap parameter with the SceneObject spec type from the scene schema (o: SceneSpec['objects'][number]).

```
sceneSpec.objects.flatMap((o) => ...) -> flatMap((o: SceneSpec['objects'][number]) => ...)
```

- **Run:** `npx vitest run tests/bootSceneBuild.test.ts tests/bootScenePreload.test.ts`
- **Expected:** Both files pass; ids list length > 0

## Acceptance criteria
- 'o' typed, no TS7006
- bootSceneBuild and bootScenePreload pass

## Definition of done
- Suites pass
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-562.md`

## Links
- Evidence: EVD-112
- Requirement: REQ-280
- Unit (Act): UNIT-559
- Unit (Verify): UNIT-562
- Status: completed
- Change: NEW
