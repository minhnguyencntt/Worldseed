# UNIT-028 — Verify: loader.ts validateWorld reference unit tests

## Summary
Point validator.test.ts at loader.ts and assert unknown scene, object, character and flag errors.

## Description
Context: validator.test.ts imports from content/world, now removed. Desired behavior: it imports loader.ts, composes LoadedWorld from fixtures and asserts errors. Expected result: validator tests pass against the surviving validator.

## How to verify
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `backend/game/tests/validator.test.ts` · `imports` · L5
- **Do:** Change the import path from '../src/content/world' to '../src/content/loader' and remove the makeWorldDir helper and the 'loadWorld and validateWorld with a valid world' loadWorld tests (L7-L16, L35-L72) since tests/loader.test.ts covers loadWorld, keeping the valid-fixture validateWorld test.

```
before: import { loadWorld, validateWorld } from '../src/content/world'; -> after: import { validateWorld } from '../src/content/loader';
```

- **Run:** `! grep -n "content/world" backend/game/tests/validator.test.ts`
- **Expected:** File imports only validateWorld from loader and no reference to content/world remains.

### Step 2 — `backend/game/tests/validator.test.ts` · `describe 'validateWorld invalid reference detection'` · L18-L27
- **Do:** Change the call validateWorld(invalidWorld, [invalidScene]) to validateWorld({ ...invalidWorld, scenes: [invalidScene] }) keeping the four toContain assertions; change the valid test to validateWorld({ ...validWorld, scenes: [validScene] }) expecting [].
- **Run:** `npx vitest run tests/validator.test.ts`
- **Expected:** Invalid and valid fixture tests pass.

### Step 3 — `backend/game/tests/validator.test.ts` · `new: it 'reports unknown start scene and unknown dialogue next'` · after L27
- **Do:** Add a test with { ...validWorld, startScene: 'missing', scenes: [{ ...validScene, dialogue: [{ id: 'd1', speaker: 'boy', text: 'Hi', choices: [{ text: 'Go', next: 'nope' }] }] }] } expecting errors toContain 'unknown scene: missing' and 'unknown dialogue: nope'. Check DialogueChoice in backend/game/src/state/types.ts for the exact choice field names before writing.
- **Run:** `npx vitest run tests/validator.test.ts tests/content.test.ts`
- **Expected:** All validator and content tests pass.

## Acceptance criteria
- Invalid fixture yields unknown scene: nowhere, unknown character: ghost, unknown flag: zzz, unknown object: nope
- Valid fixture yields []
- Unknown start scene and unknown dialogue next are reported
- Real the-boys-room content yields [] (existing content.test.ts)

## Definition of done
- npx vitest run tests/validator.test.ts tests/content.test.ts passes
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-028.md`

## Links
- Evidence: EVD-005
- Requirement: REQ-014
- Unit (Act): UNIT-026
- Unit (Verify): UNIT-028
- Status: completed
- Change: UPDATE
