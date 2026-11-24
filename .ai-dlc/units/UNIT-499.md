# UNIT-499 — Act: Call playSceneTransition from BootScene.create

## Summary
Wire the helper into BootScene.create after effects are built.

## Description
Import playSceneTransition and call it in BootScene.create with the shared effect context.

## How to act
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/src/phaser/BootScene.ts` · `BootScene.create` · L6-L25
- **Do:** Add import { playSceneTransition } from '@game/engine/playSceneTransition'; in create() replace the inline createPhaserEffectContext(this) argument with a const ctx, pass ctx to buildEffects, then call playSceneTransition(ctx, scene) right after.

```
const ctx = createPhaserEffectContext(this);
this.effects = buildEffects(ctx, scene);
playSceneTransition(ctx, scene);
```

- **Expected:** create() builds effects then plays the authored fade.

## Acceptance criteria
- create() invokes playSceneTransition(ctx, scene).
- Existing shutdown cleanup is unchanged.

## Definition of done
- BootScene type-checks
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-499.md`

## Scan baseline
- Scan version: `v1`
- Scan tip: `9cda5131c65b08541fc685d8a0898d39a0e9e9fa`

## Links
- Evidence: EVD-100
- Requirement: REQ-250
- Unit (Act): UNIT-499
- Unit (Verify): UNIT-501
- Status: completed
- Change: NEW
