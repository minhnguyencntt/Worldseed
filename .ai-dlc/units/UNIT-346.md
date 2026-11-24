# UNIT-346 — Verify: the-boys-room content and folder unit tests

## Summary
Unit tests that content validates and folders exist

## Description
Validate shipped content against schemas.

## How to verify
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/tests/boysRoomContent.test.ts` · `new: describe('the-boys-room content')` · new
- **Do:** Read manifest.json and scene.json from src/content/worlds/the-boys-room, assert assetManifestSchema and sceneSchema parse them, every scene object's asset is in manifest ids, and fs.existsSync is true for each of the 9 required asset directories under public/assets
- **Run:** `cd game && npx vitest run tests/boysRoomContent.test.ts`
- **Expected:** All assertions pass

## Acceptance criteria
- Content parses
- Asset refs resolve
- Folders exist

## Definition of done
- Tests pass
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-346.md`

## Links
- Evidence: EVD-068
- Requirement: REQ-172
- Unit (Act): UNIT-343
- Unit (Verify): UNIT-346
- Status: completed
- Change: UPDATE
