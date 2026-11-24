# UNIT-506 — Act: Add planPreload to the engine

## Summary
Create game/src/engine/planPreload.ts with planPreload and the PreloadPlan type.

## Description
Create the new engine module with the pure planPreload function that collects object assets and dust effect assets from a SceneDef.

## How to act
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/src/engine/planPreload.ts` · `new: planPreload` · new
- **Do:** Create the file. Export type PreloadPlan = { load: string[]; unknown: string[] }. Export function planPreload(scene: SceneDef, manifest: AssetManifest): PreloadPlan. Build refs from scene.objects[].asset (skip undefined), then from scene.effects entries whose type is 'dust' (their asset). Dedupe with a Set while keeping insertion order. Put an id in load if some manifest.assets entry has that id, otherwise in unknown.

```
import type { SceneDef } from '../state/types';
import type { AssetManifest } from '../assets/manifest';
export type PreloadPlan = { load: string[]; unknown: string[] };
export function planPreload(scene: SceneDef, manifest: AssetManifest): PreloadPlan {
  const refs = new Set<string>();
  for (const o of scene.objects) if (o.asset) refs.add(o.asset);
  for (const e of scene.effects ?? []) if (e.type === 'dust') refs.add(e.asset);
  const known = new Set(manifest.assets.map((a) => a.id));
  const load: string[] = [];
  const unknown: string[] = [];
  for (const id of refs) (known.has(id) ? load : unknown).push(id);
  return { load, unknown };
}
```

- **Expected:** npx tsc --noEmit in game/ passes and planPreload is importable

## Acceptance criteria
- planPreload dedupes asset ids in first-seen order
- planPreload reports unknown ids separately from load

## Definition of done
- planPreload and PreloadPlan are exported
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-506.md`

## Scan baseline
- Scan version: `v1`
- Scan tip: `9cda5131c65b08541fc685d8a0898d39a0e9e9fa`

## Links
- Evidence: EVD-102
- Requirement: REQ-253
- Unit (Act): UNIT-506
- Unit (Verify): UNIT-508
- Status: completed
- Change: UPDATE
