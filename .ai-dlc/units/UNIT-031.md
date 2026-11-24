# UNIT-031 — Verify: game/ layout and content load unit tests

## Summary
Unit tests prove the module layout and that the world loads from game/content

## Description
Context: loader.loadWorld(worldDir) validates world.yaml and scenes. Desired behavior: tests prove the moved layout exists and the real world loads. Expected result: tests pass from game/.

## How to verify
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `backend/game/tests/layout.test.ts` · `new: describe('game layout') / it('has runtime dirs and no backend/game')` · new
- **Do:** Create the test using fileURLToPath(new URL('..', import.meta.url)) as gameDir; assert existsSync for src/engine, src/state, src/systems, src/content, content/worlds/the-boys-room/world.yaml and tests, and assert existsSync(join(gameDir,'../backend/game')) is false.

```
expect(existsSync(join(gameDir,'../backend/game'))).toBe(false)
```

- **Run:** `cd game && npx vitest run tests/layout.test.ts`
- **Expected:** layout test passes

### Step 2 — `backend/game/tests/layout.test.ts` · `it('loads the-boys-room from game/content')` · after the first it
- **Do:** Import loadWorld from '../src/content/loader'; call it with join(gameDir,'content/worlds/the-boys-room') and assert the result is defined and does not throw.
- **Run:** `cd game && npx vitest run tests/layout.test.ts tests/content.test.ts tests/loader.test.ts`
- **Expected:** all three files pass

## Acceptance criteria
- Given game/, when the layout test runs, then required directories exist and backend/game does not
- Given game/content/worlds/the-boys-room, when loadWorld is called, then it returns without throwing
- Given the existing suite files, when run from game/, then they pass

## Definition of done
- layout.test.ts passes
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-031.md`

## Links
- Evidence: EVD-006
- Requirement: REQ-015
- Unit (Act): UNIT-029
- Unit (Verify): UNIT-031
- Status: completed
- Change: UPDATE
