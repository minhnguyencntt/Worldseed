# UNIT-857 — Verify: hotspot path removed and App selection uses the overlay unit tests

## Summary
Unit tests proving no hotspot-path names remain and App shows the overlay.

## Description
A source scan test with fs reading of the src tree and updated appObjectClick and appMenuClose tests.

## How to verify
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/tests/noHotspotPath.test.ts` · `new: no hotspot path` · new
- **Do:** Walk game/frontend/src and game/src with node:fs; assert no file contains HOTSPOTS, ASSET_PATHS, ActionMenu or a component named SceneView (word-boundary regex /\bSceneView\b/), and that components/ActionMenu.tsx does not exist.
- **Run:** `cd game/frontend && npx vitest run tests/noHotspotPath.test.ts`
- **Expected:** scan finds no matches

### Step 2 — `game/frontend/tests/appObjectClick.test.tsx` · `App objectClick bridge` · L50-end
- **Do:** Change assertions that query the ActionMenu region to query the overlay buttons after emitting objectClick and objectHover for the bookshelf with the Phaser host mocked.
- **Run:** `cd game/frontend && npx vitest run tests/appObjectClick.test.tsx tests/appMenuClose.test.tsx`
- **Expected:** both files pass using the overlay

## Acceptance criteria
- No forbidden names in source
- App selection renders overlay

## Definition of done
- Tests pass
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-857.md`

## Links
- Evidence: EVD-171
- Requirement: REQ-428
- Unit (Act): UNIT-853
- Unit (Verify): UNIT-857
- Status: completed
- Change: UPDATE
