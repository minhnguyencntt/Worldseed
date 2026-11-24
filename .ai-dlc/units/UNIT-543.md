# UNIT-543 — Verify: Build test types scene object callback

## Summary
Type the object callback in bootSceneBuild test

## Description
Use SceneObjectSpec for the flatMap callback in the hardcoded-ids test.

## How to verify
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/tests/bootSceneBuild.test.ts` · `describe('BootScene source has no hardcoded scene content')` · L9 and L90
- **Do:** Import type SceneObjectSpec from '../src/runtime/content' and annotate the flatMap parameter.

```
sceneSpec.objects.flatMap((o) => -> sceneSpec.objects.flatMap((o: SceneObjectSpec) =>
```

- **Run:** `cd game/frontend && npx vitest run tests/bootSceneBuild.test.ts`
- **Expected:** All tests in the file pass with no TS7006

## Acceptance criteria
- Given the build test, When mapping sceneSpec.objects, Then the parameter is typed
- Given the file, When run, Then it passes

## Definition of done
- Test passes
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-543.md`

## Links
- Evidence: EVD-109
- Requirement: REQ-271
- Unit (Act): UNIT-540
- Unit (Verify): UNIT-543
- Status: approved
- Change: UPDATE
