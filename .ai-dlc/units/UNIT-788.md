# UNIT-788 — Verify: defaultArtPaths unit tests

## Summary
Assert default manifest and assets paths from a given script directory

## Description
Unit tests for defaultArtPaths, no I/O involved.

## How to verify
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/tests/generateArtScript.test.ts` · `new: describe('defaultArtPaths')` · after existing tests
- **Do:** Import defaultArtPaths from '../scripts/generateArt'. Add test 'resolves manifest and assets root from the script dir' calling defaultArtPaths('/repo/game/frontend/scripts') and asserting manifestPath is '/repo/game/public/assets/worlds/the-boys-room/manifest.json' and assetsRoot is '/repo/game/public/assets'.
- **Run:** `npx vitest run tests/generateArtScript.test.ts -t defaultArtPaths`
- **Expected:** The new test passes

## Acceptance criteria
- manifestPath equals '/repo/game/public/assets/worlds/the-boys-room/manifest.json' for scriptDir '/repo/game/frontend/scripts'
- assetsRoot equals '/repo/game/public/assets'

## Definition of done
- Tests pass
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-788.md`

## Links
- Evidence: EVD-160
- Requirement: REQ-393
- Unit (Act): UNIT-786
- Unit (Verify): UNIT-788
- Status: completed
- Change: UPDATE
