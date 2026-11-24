# UNIT-469 — Act: Add preload planner and texture resolver with fallback

## Summary
Implement buildPreloadPlan and resolveTextureKey and use them in WorldScene.preload.

## Description
Add pure planner functions over the manifest and wire WorldScene.preload to queue only planned assets.

## How to act
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/src/assets/loaders/preload.ts` · `new: buildPreloadPlan` · new
- **Do:** Export buildPreloadPlan(manifest: AssetManifest, refs: readonly string[]) returning {load: AssetEntry[], missing: string[]}; dedupe refs with a Set, call checkAssetRefs(manifest, uniqueRefs) to get missing ids, and put manifest assets whose id is in the unique present refs into load.
- **Expected:** Present refs listed once, absent refs in missing

### Step 2 — `game/src/assets/loaders/preload.ts` · `new: resolveTextureKey` · new
- **Do:** Export resolveTextureKey(plan, loadedKeys: ReadonlySet<string>, assetId?: string): string returning assetId when it is in plan.load and loadedKeys, otherwise FALLBACK_ASSET_ID imported from manifestLoader.
- **Expected:** Fallback key for missing, undefined or failed assets

### Step 3 — `game/frontend/src/phaser/WorldScene.ts` · `WorldScene.preload` · new
- **Do:** Add preload() that calls buildPreloadPlan with the scene object asset refs, queues this.load.image or this.load.spritesheet per plan.load entry by type, records loaded keys on load 'filecomplete', and passes resolveTextureKey as the resolver to buildScene.
- **Expected:** Only planned assets are queued

## Acceptance criteria
- Plan dedupes refs and reports missing
- resolveTextureKey never throws

## Definition of done
- Typechecks
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-469.md`

## Scan baseline
- Scan version: `v1`
- Scan tip: `9cda5131c65b08541fc685d8a0898d39a0e9e9fa`

## Links
- Evidence: EVD-095
- Requirement: REQ-235
- Unit (Act): UNIT-469
- Unit (Verify): UNIT-473
- Status: approved
- Change: UPDATE
