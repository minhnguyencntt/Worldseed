# UNIT-823 — Verify: Manifest palette and size test covers the item icons and no svg

## Summary
Extend sceneArtSources.test.ts to assert item icons in manifest

## Description
Extend game/frontend/tests/sceneArtSources.test.ts, which already imports generateAssets, readPngSize and the committed manifest, with item icon assertions.

## How to verify
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/tests/sceneArtSources.test.ts` · `describe('item icons')` · after L28 ids block
- **Do:** Add a describe block with it('includes at least six item/ icons in generated and committed manifests') filtering generated.entries and committed by id.startsWith('item/'), expecting length >= 6 and that every generated id is in the committed ids.
- **Run:** `cd game/frontend && npx vitest run tests/sceneArtSources.test.ts -t 'item'`
- **Expected:** The item inclusion test passes.

### Step 2 — `game/frontend/tests/sceneArtSources.test.ts` · `it('renders each item icon at 16x16')` · within the item describe
- **Do:** For each generated entry with id starting item/, find its file in generated.files by path, assert readPngSize(file.bytes) toEqual {width:16,height:16} and entry.dimensions toEqual the same, and entry.path endsWith '.png'.
- **Run:** `cd game/frontend && npx vitest run tests/sceneArtSources.test.ts -t 'item icon'`
- **Expected:** All item icons are 16x16 PNGs matching their declared size.

### Step 3 — `game/frontend/tests/sceneArtSources.test.ts` · `it('references no svg')` · within the committed manifest describe
- **Do:** Assert committed.every(e => !e.path.endsWith('.svg')) is true.
- **Run:** `cd game/frontend && npx vitest run tests/sceneArtSources.test.ts`
- **Expected:** The whole file passes, including palette and committed-manifest match for the item icons.

## Acceptance criteria
- Test asserts at least six item/ ids are generated and committed.
- Test asserts each item PNG size equals 16x16 and the declared dimensions.
- Test asserts no committed manifest path ends in .svg.

## Definition of done
- sceneArtSources.test.ts passes.
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-823.md`

## Links
- Evidence: EVD-166
- Requirement: REQ-411
- Unit (Act): UNIT-821
- Unit (Verify): UNIT-823
- Status: completed
- Change: UPDATE
