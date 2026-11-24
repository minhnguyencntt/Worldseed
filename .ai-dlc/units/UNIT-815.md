# UNIT-815 — Act: Delete placeholder SVGs, stale frontend/public assets and SceneView

## Summary
Remove all svg files and the unused hotspot-over-image code

## Description
git rm all svg files under both asset roots, the duplicate README, frontend/src/components/SceneView.tsx and frontend/src/runtime/assets.ts.

## How to act
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/public/assets/bedroom.svg` · `all svg files under game/public/assets and game/frontend/public/assets` · whole files
- **Do:** Run git rm on every tracked .svg under both roots plus game/frontend/public/assets/README.md (its file table lists only SVGs).
- **Run:** `cd game && git rm $(git ls-files 'public/*.svg' 'frontend/public/*.svg' frontend/public/assets/README.md)`
- **Expected:** git ls-files 'public/*.svg' 'frontend/public/*.svg' prints nothing

### Step 2 — `game/frontend/src/components/SceneView.tsx` · `SceneView` · whole file
- **Do:** Delete the file; nothing in App imports it.
- **Run:** `cd game && git rm frontend/src/components/SceneView.tsx`
- **Expected:** File removed

### Step 3 — `game/frontend/src/runtime/assets.ts` · `ASSET_PATHS, HOTSPOTS` · L1-L19
- **Do:** Delete the file; it only serves SceneView and names bedroom.svg.
- **Run:** `cd game && git rm frontend/src/runtime/assets.ts && grep -rn "runtime/assets" frontend/src`
- **Expected:** grep prints nothing

## Acceptance criteria
- No .svg under the asset roots
- SceneView and ASSET_PATHS are gone

## Definition of done
- git ls-files shows no svg under public
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-815.md`

## Scan baseline
- Scan version: `v1`
- Scan tip: `9cda5131c65b08541fc685d8a0898d39a0e9e9fa`

## Links
- Evidence: EVD-165
- Requirement: REQ-409
- Unit (Act): UNIT-815
- Unit (Verify): UNIT-819
- Status: completed
- Change: UPDATE
