# UNIT-782 — Act: Add runGenerateArt, the generateArt script and the art:generate npm script

## Summary
Wire the generator to fs and package.json

## Description
Add runGenerateArt with injected IO in generateAssets.ts, the script scripts/generateArt.ts and the npm script.

## How to act
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/src/lib/generateAssets.ts` · `new: runGenerateArt` · after generateAssets
- **Do:** Export runGenerateArt(io:{readText(p):string; writeBytes(p,b):void; writeText(p,t):void}, paths:{assetsRoot:string; manifest:string}, sources=ART_SOURCES): read manifest JSON, call generateAssets, writeBytes(assetsRoot+'/'+path) for each file, then writeText(manifest, JSON.stringify(mergeManifest(...),null,2)+'\n').
- **Expected:** Each source file and the manifest are written once

### Step 2 — `game/frontend/scripts/generateArt.ts` · `new: main` · new
- **Do:** Import node:fs mkdirSync, readFileSync, writeFileSync and node:path; call runGenerateArt with io creating parent dirs before writing and paths resolved from import.meta.url to ../public/assets and ../../public/assets/worlds/the-boys-room/manifest.json.
- **Expected:** Running the script writes ui/cursors/hand.png

### Step 3 — `game/frontend/package.json` · `scripts` · L5-L12
- **Do:** Add the entry "art:generate": "vite-node scripts/generateArt.ts" after the untrack:node-modules entry, adding a comma to the previous line.

```
"untrack:node-modules": "...",
"art:generate": "vite-node scripts/generateArt.ts"
```

- **Expected:** npm run art:generate resolves

## Acceptance criteria
- runGenerateArt writes PNGs and the manifest through injected IO
- package.json has art:generate

## Definition of done
- npm run art:generate runs
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-782.md`

## Scan baseline
- Scan version: `v1`
- Scan tip: `9cda5131c65b08541fc685d8a0898d39a0e9e9fa`

## Links
- Evidence: EVD-159
- Requirement: REQ-392
- Unit (Act): UNIT-782
- Unit (Verify): UNIT-785
- Status: completed
- Change: UPDATE
