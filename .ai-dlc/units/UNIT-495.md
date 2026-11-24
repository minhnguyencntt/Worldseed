# UNIT-495 — Act: Call playSceneTransition from BootScene.create

## Summary
Wire the helper into BootScene

## Description
In BootScene.create, create the effect context once, pass it to buildEffects and playSceneTransition.

## How to act
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/src/phaser/BootScene.ts` · `imports` · L1-L8
- **Do:** Add import { playSceneTransition } from '@game/engine/playSceneTransition'; after the buildEffects import.

```
import { playSceneTransition } from '@game/engine/playSceneTransition';
```

- **Expected:** Import resolves

### Step 2 — `game/frontend/src/phaser/BootScene.ts` · `BootScene.create` · L22-L25
- **Do:** Replace the inline createPhaserEffectContext(this) argument with a const ctx, pass ctx to buildEffects, then call playSceneTransition(ctx, scene) on the next line.

```
before: this.effects = buildEffects(createPhaserEffectContext(this), scene);
after: const ctx = createPhaserEffectContext(this);
this.effects = buildEffects(ctx, scene);
playSceneTransition(ctx, scene);
```

- **Expected:** The fade plays on scene start

## Acceptance criteria
- create() calls playSceneTransition(ctx, scene) after buildEffects
- Cleanup and sceneReady unchanged

## Definition of done
- BootScene calls the helper
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-495.md`

## Scan baseline
- Scan version: `v1`
- Scan tip: `9cda5131c65b08541fc685d8a0898d39a0e9e9fa`

## Links
- Evidence: EVD-099
- Requirement: REQ-248
- Unit (Act): UNIT-495
- Unit (Verify): UNIT-497
- Status: approved
- Change: UPDATE
