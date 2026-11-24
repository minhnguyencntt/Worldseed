# UNIT-490 — Act: Add Phaser effect context and wire it into BootScene

## Summary
Phaser adapter and BootScene wiring

## Description
Create createPhaserEffectContext(scene) and use it in BootScene.create.

## How to act
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/src/phaser/effectContext.ts` · `new: createPhaserEffectContext` · new
- **Do:** Export createPhaserEffectContext(scene: Phaser.Scene): EffectRenderContext. createEffect: for 'dust' call scene.add.particles(x,y,'effect:dust',{quantity..., emitZone via area}) and setDepth(spec.depth); for 'ambientLight' scene.add.rectangle(0,0,w,h,parseInt(color.slice(1),16),alpha).setOrigin(0).setDepth(spec.depth); return { destroy } calling the object's destroy(). playTransition(ms) calls scene.cameras.main.fadeIn(ms)
- **Expected:** Returns an EffectRenderContext

### Step 2 — `game/frontend/src/phaser/BootScene.ts` · `BootScene.create` · L20-L28
- **Do:** Add private effects: EffectHandle[] = []; in create() after subscribe set this.effects = buildEffects(createPhaserEffectContext(this), scene) importing scene from '../runtime/content'; in the SHUTDOWN callback destroy each handle and reset the array
- **Expected:** Effects created on create and destroyed on shutdown

## Acceptance criteria
- Effects are built in BootScene.create from scene content
- Effect handles are destroyed on scene shutdown

## Definition of done
- Compiles under tsc
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-490.md`

## Scan baseline
- Scan version: `v1`
- Scan tip: `9cda5131c65b08541fc685d8a0898d39a0e9e9fa`

## Links
- Evidence: EVD-098
- Requirement: REQ-246
- Unit (Act): UNIT-490
- Unit (Verify): UNIT-493
- Status: completed
- Change: UPDATE
