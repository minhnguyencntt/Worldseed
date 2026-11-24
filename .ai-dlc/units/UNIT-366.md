# UNIT-366 — Act: Add checkAssetRefs to the manifest loader

## Summary
Export checkAssetRefs returning issues for refs missing from the manifest

## Description
Add a pure helper next to loadManifestFile that compares a list of asset refs to manifest ids.

## How to act
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/src/assets/loaders/manifestLoader.ts` · `new: checkAssetRefs` · after L33
- **Do:** Append exported function checkAssetRefs(manifest: AssetManifest, refs: readonly string[]): ManifestIssue[] that builds a Set of manifest.assets ids and returns one issue per ref not in the set.

```
export function checkAssetRefs(manifest: AssetManifest, refs: readonly string[]): ManifestIssue[] {
  const ids = new Set(manifest.assets.map((a) => a.id));
  return refs.flatMap((ref, index) => (ids.has(ref) ? [] : [{ path: `refs.${index}`, message: `unknown asset ref: ${ref}` }]));
}
```

- **Expected:** npx tsc --noEmit in game passes and the function is exported.

## Acceptance criteria
- checkAssetRefs returns one issue per unknown ref
- checkAssetRefs returns [] when all refs exist

## Definition of done
- Helper exported and typechecks
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-366.md`

## Scan baseline
- Scan version: `v1`
- Scan tip: `9cda5131c65b08541fc685d8a0898d39a0e9e9fa`

## Links
- Evidence: EVD-072
- Requirement: REQ-183
- Unit (Act): UNIT-366
- Unit (Verify): UNIT-368
- Status: completed
- Change: UPDATE
