# UNIT-819 — Verify: No svg remains and obsolete SVG-only tests are replaced

## Summary
Unit test guarding against svg files and rewrite of tests that asserted svg assets

## Description
Add a read-only guard walking the two asset roots, and delete or convert tests that asserted SVG files exist.

## How to verify
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/tests/noSvgAssets.test.ts` · `new: describe('no placeholder svgs')` · new
- **Do:** Walk game/public/assets and game/frontend/public/assets with readdirSync (skip missing dirs) and expect no file ending .svg; also expect manifest.json text not to contain '.svg'.
- **Run:** `cd game && npx vitest run tests/noSvgAssets.test.ts`
- **Expected:** Test passes

### Step 2 — `game/tests/publicAssetSvgs.test.ts` · `obsolete svg suites` · whole files
- **Do:** Delete game/tests/publicAssetSvgs.test.ts, sg3ObjectAssets.test.ts, sg3CharacterSheets.test.ts, sg3BackgroundFurniture.test.ts, publicAssetUi.test.ts, publicAssetUiManifest.test.ts and game/frontend/tests/scene.test.tsx, since they assert the removed SVG files and SceneView. Edit tests/assetFolders.test.ts to drop the 'every svg starts with <svg' case. Edit frontend/tests/boyManifestFile.test.ts to replace the 'keeps character:boy as SVG' case with an assertion that no character:boy entry exists.
- **Run:** `cd game && npx vitest run tests/assetFolders.test.ts tests/noSvgAssets.test.ts tests/manifestLoader.test.ts && cd frontend && npx vitest run tests/boyManifestFile.test.ts tests/bootScene.test.ts`
- **Expected:** All listed files pass

## Acceptance criteria
- Guard fails if any .svg is under the asset roots
- Old svg tests are removed or converted to PNG assertions
- BootScene suites still pass

## Definition of done
- Listed suites pass
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-819.md`

## Links
- Evidence: EVD-165
- Requirement: REQ-409
- Unit (Act): UNIT-815
- Unit (Verify): UNIT-819
- Status: completed
- Change: UPDATE
