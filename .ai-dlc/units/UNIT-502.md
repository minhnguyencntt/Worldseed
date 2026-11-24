# UNIT-502 — Act: Add planPreload and resolveTextureKey engine module

## Summary
Create game/src/engine/preload.ts

## Description
Implement the pure planner and the fallback resolver on top of existing manifest types and checkAssetRefs.

## How to act
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/src/engine/preload.ts` · `new: planPreload` · new
- **Do:** Create planPreload(manifest: AssetManifest, scene: SceneDef): PreloadPlan. Collect refs from scene.objects[].asset and from scene.effects entries of type 'dust' (their asset). Call checkAssetRefs(manifest, refs) for issues, drop unknown ids, dedupe by id, and map each asset to an entry {id, path, type, frames}.

```
export type PreloadEntry = { id: string; path: string; type: 'image'|'spritesheet'|'audio'; frames?: AssetEntry['frames'] };
export type PreloadPlan = { entries: PreloadEntry[]; issues: ManifestIssue[] };
```

- **Expected:** Plan for the bedroom scene has unique ids and empty issues

### Step 2 — `game/src/engine/preload.ts` · `new: resolveTextureKey` · new
- **Do:** Create resolveTextureKey(key: string, loaded: ReadonlySet<string>): string returning key when loaded.has(key), otherwise FALLBACK_ASSET_ID imported from '../assets/loaders/manifestLoader'.

```
export const resolveTextureKey = (key: string, loaded: ReadonlySet<string>) => (loaded.has(key) ? key : FALLBACK_ASSET_ID);
```

- **Expected:** Unknown key resolves to 'fallback:missing'

## Acceptance criteria
- planPreload returns deduplicated entries and issues
- resolveTextureKey returns the fallback id for unknown or failed keys

## Definition of done
- Module compiles under tsc --noEmit
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-502.md`

## Scan baseline
- Scan version: `v1`
- Scan tip: `9cda5131c65b08541fc685d8a0898d39a0e9e9fa`

## Links
- Evidence: EVD-101
- Requirement: REQ-251
- Unit (Act): UNIT-502
- Unit (Verify): UNIT-504
- Status: approved
- Change: UPDATE
