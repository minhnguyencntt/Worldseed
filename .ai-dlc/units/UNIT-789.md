# UNIT-789 — Verify: createFsIo reads and rewrites the app manifest with mocked fs

## Summary
Assert the CLI I/O targets the default manifest and assets with a fake fs

## Description
Unit tests for createFsIo and runGenerateArt using a fake fs object (vi.fn) and no disk access.

## How to verify
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/tests/generateArtScript.test.ts` · `new: describe('createFsIo')` · after defaultArtPaths tests
- **Do:** Build paths = defaultArtPaths('/repo/game/frontend/scripts') and a fake fs with readFileSync returning '{"version":1,"assets":[]}', writeFileSync and mkdirSync as vi.fn. Run runGenerateArt(createFsIo(paths, fake)). Assert writeFileSync was called with paths.manifestPath and a string, and that every other written path starts with paths.assetsRoot.
- **Run:** `npx vitest run tests/generateArtScript.test.ts -t createFsIo`
- **Expected:** Manifest rewritten at the-boys-room path; PNGs under public/assets

### Step 2 — `game/frontend/tests/generateArtScript.test.ts` · `new: test 'throws when the manifest is missing'` · after previous test
- **Do:** Fake fs readFileSync throws Error('ENOENT'); assert createFsIo(paths, fake).readText(paths.manifestPath) throws and no writeFileSync call happened.
- **Run:** `npx vitest run tests/generateArtScript.test.ts -t missing`
- **Expected:** Test passes; missing manifest is not replaced by an empty one

## Acceptance criteria
- With a fake fs serving the existing manifest at the default path, runGenerateArt writes merged JSON to that same path
- A fake fs whose readFileSync throws makes readText throw
- PNG files are written under the default assetsRoot

## Definition of done
- Tests pass
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-789.md`

## Links
- Evidence: EVD-160
- Requirement: REQ-394
- Unit (Act): UNIT-787
- Unit (Verify): UNIT-789
- Status: completed
- Change: UPDATE
