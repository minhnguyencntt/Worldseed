# UNIT-510 — Act: Add BootScene.preload driven by planPreload

## Summary
Export manifest and implement preload

## Description
Bundle manifest.json into runtime/content.ts, validate with parseManifest, and add BootScene.preload that loads planned ids.

## How to act
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/src/runtime/content.ts` · `new: manifest` · after L32
- **Do:** Import manifest.json from public/assets/worlds/the-boys-room and export `manifest` as the data of parseManifest(json); throw an Error listing errors when ok is false.

```
import manifestJson from '../../../public/assets/worlds/the-boys-room/manifest.json';
import { parseManifest } from '@game/assets/manifest';
const parsed = parseManifest(manifestJson);
if (!parsed.ok) throw new Error('invalid manifest: ' + JSON.stringify(parsed.errors));
export const manifest = parsed.data;
```

- **Expected:** content.ts exports a validated manifest

### Step 2 — `game/frontend/src/phaser/BootScene.ts` · `BootScene.preload` · after L22
- **Do:** Add preload(): compute plan = planPreload(scene, manifest); console.warn for each plan.unknown id; for each id in plan.load find the manifest entry and call this.load.image(entry.id, `assets/${entry.path}`) when entry.type is 'image'; skip other types.

```
preload(): void {
  const plan = planPreload(scene, manifest);
  plan.unknown.forEach((id) => console.warn(`unknown asset ref: ${id}`));
  for (const id of plan.load) {
    const entry = manifest.assets.find((a) => a.id === id);
    if (entry && entry.type === 'image') this.load.image(entry.id, `assets/${entry.path}`);
  }
}
```

- **Expected:** Only planned images are queued

## Acceptance criteria
- preload calls this.load.image(id, 'assets/'+path) only for planned image ids
- unknown ids are warned, not loaded

## Definition of done
- BootScene has preload using planPreload
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-510.md`

## Scan baseline
- Scan version: `v1`
- Scan tip: `9cda5131c65b08541fc685d8a0898d39a0e9e9fa`

## Links
- Evidence: EVD-103
- Requirement: REQ-255
- Unit (Act): UNIT-510
- Unit (Verify): UNIT-512
- Status: completed
- Change: UPDATE
