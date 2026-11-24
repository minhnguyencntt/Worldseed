# UNIT-790 — Act: Point defaultArtPaths at game/public/assets

## Summary
Change the assetsRoot resolution in defaultArtPaths

## Description
Edit defaultArtPaths in game/frontend/scripts/generateArt.ts so assetsRoot resolves two levels up from the script dir. The CLI entry already calls defaultArtPaths, so it is wired in with no further change.

## How to act
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/scripts/generateArt.ts` · `defaultArtPaths` · L22-L25
- **Do:** Change the assetsRoot constant to resolve scriptDir with '../../public/assets' instead of '../public/assets'; leave the manifestPath line unchanged.

```
const assetsRoot = resolve(scriptDir, '../public/assets'); -> const assetsRoot = resolve(scriptDir, '../../public/assets');
```

- **Expected:** defaultArtPaths('/repo/game/frontend/scripts') returns assetsRoot /repo/game/public/assets

## Acceptance criteria
- assetsRoot is resolve(scriptDir, '../../public/assets')
- manifestPath is resolve(assetsRoot, 'worlds/the-boys-room/manifest.json')

## Definition of done
- defaultArtPaths returns game/public/assets paths
- Script still type-checks
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-790.md`

## Scan baseline
- Scan version: `v1`
- Scan tip: `9cda5131c65b08541fc685d8a0898d39a0e9e9fa`

## Links
- Evidence: EVD-161
- Requirement: REQ-395
- Unit (Act): UNIT-790
- Unit (Verify): UNIT-791
- Status: completed
- Change: UPDATE
