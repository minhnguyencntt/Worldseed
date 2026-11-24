# UNIT-817 — Verify: Scene content and manifest contain no svg and resolve to PNG ids

## Summary
Unit tests over real content and manifest via runtime/content

## Description
Spec-driven assertions on bedroom content and manifest. Content is parsed from the bundled yaml, no I/O mocks needed beyond that.

## How to verify
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/tests/sceneContentPng.test.ts` · `new: describe('scene content uses only PNGs')` · new
- **Do:** Import { scene, sceneSpec, manifest } from '../src/runtime/content', planPreload from '@game/engine/planPreload', resolveCharacterAnimation from '@game/engine/characterAnimation', generateAssets and ART_SOURCES. Tests: (1) JSON.stringify(manifest) and JSON.stringify(sceneSpec) do not contain '.svg'; (2) every non-audio manifest path ends '.png'; (3) planPreload(scene, manifest).unknown equals []; (4) each object position + its manifest dimensions is within x<=480 and y<=270; (5) for idle, walk, interact resolveCharacterAnimation(sceneSpec.characters[0], name, manifest) returns asset 'character:boy-sheet' and manifest animations frames lengths 4, 6, 4; (6) the dust effect area width 480 and height 270; (7) manifest image dimensions equal generateAssets(ART_SOURCES) entries.
- **Run:** `cd game/frontend && npx vitest run tests/sceneContentPng.test.ts`
- **Expected:** All tests pass

### Step 2 — `game/tests/content.test.ts` · `existing content assertions` · whole file
- **Do:** Run it and update only assertions that name old asset ids or 320x180 positions (objects/bed and similar) to the new room/* ids and positions from bedroom.yaml.
- **Run:** `cd game && npx vitest run tests/content.test.ts tests/sceneView.test.ts`
- **Expected:** Both files pass

## Acceptance criteria
- No .svg in manifest or scene JSON
- planPreload unknown list is empty
- Object bounds inside 480x270
- Boy animations have 4, 6 and 4 frames

## Definition of done
- Passes
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-817.md`

## Links
- Evidence: EVD-165
- Requirement: REQ-407
- Unit (Act): UNIT-813
- Unit (Verify): UNIT-817
- Status: completed
- Change: UPDATE
