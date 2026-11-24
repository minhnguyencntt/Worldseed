# UNIT-381 — Verify: ui manifest entries validate and match SVG dimensions unit tests

## Summary
Unit tests check the ui manifest entries parse, resolve and match the SVG sizes.

## Description
Read-only unit tests over manifest.json and the ui SVGs; no app is started.

## How to verify
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/tests/publicAssetUiManifest.test.ts` · `new: describe('ui manifest entries')` · new
- **Do:** Create a test that reads ../public/assets/worlds/the-boys-room/manifest.json, asserts parseManifest(raw).ok is true, then for ids ui:icon-sound, ui:panel-frame and ui:cursor-pointer asserts the entry exists, existsSync(join(publicRoot, entry.path)) is true, and the SVG width and height attributes parsed with regex equal entry.dimensions (16x16, 24x24, 16x16).
- **Run:** `cd game && npx vitest run tests/publicAssetUiManifest.test.ts`
- **Expected:** All tests in publicAssetUiManifest.test.ts pass

## Acceptance criteria
- Given manifest.json, When parsed with parseManifest, Then ok is true
- Given each ui entry, When its path is resolved under game/public/assets, Then the file exists and its SVG size equals the manifest dimensions

## Definition of done
- Test file passes
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-381.md`

## Links
- Evidence: EVD-075
- Requirement: REQ-190
- Unit (Act): UNIT-379
- Unit (Verify): UNIT-381
- Status: completed
- Change: UPDATE
