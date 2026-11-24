# UNIT-786 — Act: Add defaultArtPaths to generateArt.ts

## Summary
Export defaultArtPaths(scriptDir) returning manifestPath and assetsRoot

## Description
Add a pure exported function in game/frontend/scripts/generateArt.ts that resolves the app manifest and assets root relative to the script directory.

## How to act
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/scripts/generateArt.ts` · `imports` · L1-L2
- **Do:** Change the node:path import to also import resolve alongside dirname.

```
import { dirname, resolve } from 'node:path';
```

- **Expected:** resolve is available in the module

### Step 2 — `game/frontend/scripts/generateArt.ts` · `new: defaultArtPaths` · after L13
- **Do:** Add exported interface ArtPaths { assetsRoot: string; manifestPath: string } and function defaultArtPaths(scriptDir: string): ArtPaths returning assetsRoot resolve(scriptDir, '../../public/assets') and manifestPath resolve(scriptDir, '../../public/assets/worlds/the-boys-room/manifest.json').

```
export function defaultArtPaths(scriptDir: string): ArtPaths {
  const assetsRoot = resolve(scriptDir, '../../public/assets');
  return { assetsRoot, manifestPath: resolve(assetsRoot, 'worlds/the-boys-room/manifest.json') };
}
```

- **Expected:** Function returns both absolute paths for a given scriptDir

## Acceptance criteria
- defaultArtPaths('/repo/game/frontend/scripts').manifestPath equals '/repo/game/public/assets/worlds/the-boys-room/manifest.json'
- defaultArtPaths('/repo/game/frontend/scripts').assetsRoot equals '/repo/game/public/assets'

## Definition of done
- Function exported with documented return shape
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-786.md`

## Scan baseline
- Scan version: `v1`
- Scan tip: `9cda5131c65b08541fc685d8a0898d39a0e9e9fa`

## Links
- Evidence: EVD-160
- Requirement: REQ-393
- Unit (Act): UNIT-786
- Unit (Verify): UNIT-788
- Status: completed
- Change: NEW
