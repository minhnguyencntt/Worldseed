# UNIT-787 — Act: Add createFsIo and use it in the CLI entry

## Summary
Build the ArtIo from default paths with injected fs and drop the empty-manifest fallback

## Description
Replace the cwd-relative entry block in generateArt.ts with an ArtIo built by createFsIo(defaultArtPaths(dirname(fileURLToPath(import.meta.url))), fs).

## How to act
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/scripts/generateArt.ts` · `imports` · L1-L2
- **Do:** Add import { fileURLToPath } from 'node:url'; keep existing node:fs imports.

```
import { fileURLToPath } from 'node:url';
```

- **Expected:** fileURLToPath available

### Step 2 — `game/frontend/scripts/generateArt.ts` · `new: createFsIo` · after defaultArtPaths
- **Do:** Add exported FsLike interface { readFileSync(p: string, enc: 'utf8'): string; writeFileSync(p: string, d: Uint8Array | string): void; mkdirSync(p: string, o: { recursive: true }): void } and createFsIo(paths: ArtPaths, fs: FsLike): ArtIo. readText calls fs.readFileSync(path,'utf8') with no existence fallback; write calls fs.mkdirSync(dirname(path),{recursive:true}) then fs.writeFileSync(path,data).
- **Expected:** ArtIo built over injected fs

### Step 3 — `game/frontend/scripts/generateArt.ts` · `EMPTY_MANIFEST_TEXT` · L13
- **Do:** Delete the EMPTY_MANIFEST_TEXT constant.
- **Expected:** No empty-manifest fallback remains

### Step 4 — `game/frontend/scripts/generateArt.ts` · `entry block (if process.env.VITEST === undefined)` · L38-L50
- **Do:** Replace the body with runGenerateArt(createFsIo(defaultArtPaths(dirname(fileURLToPath(import.meta.url))), { readFileSync, writeFileSync, mkdirSync })); remove the unused existsSync import.

```
runGenerateArt(createFsIo(defaultArtPaths(dirname(fileURLToPath(import.meta.url))), { readFileSync, writeFileSync, mkdirSync }));
```

- **Expected:** CLI uses the app manifest and assets paths regardless of cwd

## Acceptance criteria
- createFsIo returns assetsRoot and manifestPath from the given paths
- readText on a missing manifest throws instead of returning an empty manifest
- The entry block passes real node:fs functions into createFsIo

## Definition of done
- Entry block no longer references 'public/assets' strings or EMPTY_MANIFEST_TEXT
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-787.md`

## Scan baseline
- Scan version: `v1`
- Scan tip: `9cda5131c65b08541fc685d8a0898d39a0e9e9fa`

## Links
- Evidence: EVD-160
- Requirement: REQ-394
- Unit (Act): UNIT-787
- Unit (Verify): UNIT-789
- Status: completed
- Change: UPDATE
