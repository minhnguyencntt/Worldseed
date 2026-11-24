# UNIT-382 — Act: Add findMissingAssetPaths to the manifest loader

## Summary
Export a pure helper listing manifest asset paths not present in a file list.

## Description
Add findMissingAssetPaths(manifest, presentFiles) to manifestLoader.ts next to checkAssetRefs, returning the asset paths not found in presentFiles.

## How to act
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/src/assets/loaders/manifestLoader.ts` · `new: findMissingAssetPaths` · after L87
- **Do:** Append exported function findMissingAssetPaths(manifest: AssetManifest, presentFiles: readonly string[]): string[] that builds a Set from presentFiles and returns manifest.assets paths not in the Set.

```
export function findMissingAssetPaths(manifest: AssetManifest, presentFiles: readonly string[]): string[] {
  const present = new Set(presentFiles);
  return manifest.assets.map((a) => a.path).filter((p) => !present.has(p));
}
```

- **Expected:** Function is exported and `npx tsc --noEmit` in game/ passes.

## Acceptance criteria
- Returns [] when every manifest path is in presentFiles
- Returns the paths not in presentFiles, in manifest order

## Definition of done
- Helper exported with typed signature; typecheck passes
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-382.md`

## Scan baseline
- Scan version: `v1`
- Scan tip: `9cda5131c65b08541fc685d8a0898d39a0e9e9fa`

## Links
- Evidence: EVD-076
- Requirement: REQ-191
- Unit (Act): UNIT-382
- Unit (Verify): UNIT-383
- Status: completed
- Change: UPDATE
