# UNIT-555 — Verify: Build test types scene object callback

## Summary
bootSceneBuild annotates o

## Description
Annotate the flatMap callback with SceneObjectSpec.

## How to verify
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/tests/bootSceneBuild.test.ts` · `ids const` · L138
- **Do:** Import type SceneObjectSpec from '../src/runtime/content' and annotate o

```
sceneSpec.objects.flatMap((o: SceneObjectSpec) => [o.id, o.asset])
```

- **Run:** `npx vitest run tests/bootSceneBuild.test.ts`
- **Expected:** All tests pass

## Acceptance criteria
- Given the annotation, When tsc runs, Then no TS7006
- Given the suite, When run, Then it passes

## Definition of done
- Suite passes
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-555.md`

## Links
- Evidence: EVD-111
- Requirement: REQ-276
- Unit (Act): UNIT-551
- Unit (Verify): UNIT-555
- Status: approved
- Change: NEW
