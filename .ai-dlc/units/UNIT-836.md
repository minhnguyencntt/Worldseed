# UNIT-836 — Verify: Frame grids, generated PNGs and removal of old SVGs

## Summary
Unit tests for frame sources, manifest match and no legacy SVG

## Description
Test grid size, palette use, slice rules, manifest/PNG sizes and absence of old SVGs.

## How to verify
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/tests/uiFrames.test.ts` · `new: describe('interface frame kit art')` · new
- **Do:** Test 'grids': for each FRAME_KIT entry assert buildFrameGrid has h rows of w cells, every value is an integer in [0, PALETTE.length), and slice*2 < min(w,h). Test 'ids': assert ids include bar, panel, plaque, parchment, slot and the four button states. Test 'determinism': two calls give toEqual grids.
- **Run:** `npx vitest run tests/uiFrames.test.ts`
- **Expected:** Grid tests pass

### Step 2 — `game/frontend/tests/uiFrames.test.ts` · `it('manifest and files match')` · after grid tests
- **Do:** Read game/public/assets/worlds/the-boys-room/manifest.json, for each FRAME_KIT id find the entry, assert dimensions equal {w,h}, and use readPngSize from src/lib/pngEncode on the file bytes at public/assets/<path> to assert it equals the dimensions. Assert ui/cursor-hand is still present. Walk game/public recursively and assert no file name matches /panel-frame|sound|pointer/ with .svg extension.
- **Run:** `npx vitest run tests/uiFrames.test.ts`
- **Expected:** Manifest, PNG sizes and no-SVG assertions pass

## Acceptance criteria
- Grid sizes and palette indices valid
- Manifest ids match PNG header sizes
- No panel-frame, sound or pointer svg

## Definition of done
- uiFrames.test.ts passes
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-836.md`

## Links
- Evidence: EVD-168
- Requirement: REQ-417
- Unit (Act): UNIT-832
- Unit (Verify): UNIT-836
- Status: completed
- Change: UPDATE
