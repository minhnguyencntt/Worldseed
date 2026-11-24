# UNIT-367 — Act: Add loadManifestWithFallback to the manifest loader

## Summary
Export loadManifestWithFallback and FALLBACK_ASSET_ID

## Description
Add a never-throwing loader that keeps existing assets, reports missing ones and returns an empty manifest on unreadable or invalid input.

## How to act
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/src/assets/loaders/manifestLoader.ts` · `new: FALLBACK_ASSET_ID, FallbackLoadResult` · after L33
- **Do:** Export const FALLBACK_ASSET_ID = 'fallback:missing' and type FallbackLoadResult = { manifest: AssetManifest; missing: { id: string; path: string }[]; errors: ManifestIssue[]; fallbackAssetId: string }.
- **Expected:** Types compile.

### Step 2 — `game/src/assets/loaders/manifestLoader.ts` · `new: loadManifestWithFallback` · after L33
- **Do:** Export loadManifestWithFallback(manifestPath, assetsRoot): FallbackLoadResult. Read and JSON.parse in try/catch; on failure or parseManifest !ok return manifest {version:1, assets:[]}, errors set, missing []. Otherwise split parsed.data.assets by existsSync(join(assetsRoot, asset.path)); keep existing ones in manifest, push the rest to missing; errors []. Always set fallbackAssetId: FALLBACK_ASSET_ID.

```
const empty: AssetManifest = { version: 1, assets: [] };
```

- **Expected:** Function returns without throwing for every input.

## Acceptance criteria
- Missing files are listed and dropped from the manifest
- Unreadable manifest yields empty assets plus errors

## Definition of done
- Function exported and typechecks
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-367.md`

## Scan baseline
- Scan version: `v1`
- Scan tip: `9cda5131c65b08541fc685d8a0898d39a0e9e9fa`

## Links
- Evidence: EVD-072
- Requirement: REQ-184
- Unit (Act): UNIT-367
- Unit (Verify): UNIT-369
- Status: completed
- Change: UPDATE
