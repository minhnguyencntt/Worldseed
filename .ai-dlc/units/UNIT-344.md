# UNIT-344 — Act: Implement the manifest loader

## Summary
loadManifest with reference validation and fallbacks

## Description
Implement loader that never throws.

## How to act
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/src/assets/loaders/manifestLoader.ts` · `new: loadManifest, resolveAsset, FALLBACK_ASSET` · new
- **Do:** Export loadManifest(manifestData: unknown, scene: unknown, exists: (assetPath:string)=>boolean): {manifest: AssetManifest|null; scene: SceneContent|null; errors: string[]; missing: string[]; dangling: {objectId:string; asset:string}[]}. Use safeParse for both; on failure push `path: message` strings to errors. For each manifest asset where !exists(path) push id to missing. For each scene object whose asset is not a manifest id push to dangling. Wrap in try/catch to never throw. Export FALLBACK_ASSET (id 'fallback', type 'object', path 'ui/frames/fallback.png') and resolveAsset(report, id) returning the manifest entry or FALLBACK_ASSET when id is missing from manifest or in report.missing
- **Expected:** Compiles; never throws

## Acceptance criteria
- Returns report with errors, dangling, missing
- resolveAsset returns fallback for missing

## Definition of done
- Loader exported
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-344.md`

## Scan baseline
- Scan version: `v1`
- Scan tip: `9cda5131c65b08541fc685d8a0898d39a0e9e9fa`

## Links
- Evidence: EVD-068
- Requirement: REQ-173
- Unit (Act): UNIT-344
- Unit (Verify): UNIT-347
- Status: completed
- Change: UPDATE
