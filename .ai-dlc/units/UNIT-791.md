# UNIT-791 — Verify: defaultArtPaths unit tests for game/public/assets

## Summary
Update the defaultArtPaths test to the new expected paths

## Description
Update the existing test in game/frontend/tests/generateArtScript.test.ts, which uses no I/O, to assert the game/public/assets paths.

## How to verify
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/tests/generateArtScript.test.ts` · `describe('defaultArtPaths') › it('resolves manifest and assets root from the script dir')` · L124-L131
- **Do:** Call defaultArtPaths('/repo/game/frontend/scripts') and change the two expectations: manifestPath toBe '/repo/game/public/assets/worlds/the-boys-room/manifest.json' and assetsRoot toBe '/repo/game/public/assets'.

```
expect(paths.manifestPath).toBe('/repo/game/public/assets/worlds/the-boys-room/manifest.json'); expect(paths.assetsRoot).toBe('/repo/game/public/assets');
```

- **Run:** `cd game/frontend && npx vitest run tests/generateArtScript.test.ts`
- **Expected:** All tests in generateArtScript.test.ts pass, including the updated defaultArtPaths test

## Acceptance criteria
- Test expects assetsRoot /repo/game/public/assets
- Test expects manifestPath /repo/game/public/assets/worlds/the-boys-room/manifest.json

## Definition of done
- Updated test passes
- Other tests in the file still pass
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-791.md`

## Links
- Evidence: EVD-161
- Requirement: REQ-395
- Unit (Act): UNIT-790
- Unit (Verify): UNIT-791
- Status: completed
- Change: UPDATE
