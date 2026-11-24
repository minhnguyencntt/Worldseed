# UNIT-471 — Act: Add effects schema, effect entities and fade transition

## Summary
Implement effect definitions, creation and transitions.

## Description
Extend sceneSchema, create effect entities, add runTransition and wire into buildScene and WorldScene; add effect entries to bedroom.yaml.

## How to act
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/src/content/schema.ts` · `effectSchema, sceneSchema` · L35-L41
- **Do:** Add effectSchema = z.object({id: z.string(), type: z.enum(['dust','ambientLight']), asset: z.string().optional(), count: z.number().int().positive().optional(), color: z.number().optional(), alpha: z.number().min(0).max(1).optional()}) and add effects: z.array(effectSchema).default([]) to sceneSchema; export type EffectSpec.
- **Expected:** Scenes without effects parse with effects []

### Step 2 — `game/src/state/types.ts` · `SceneDef` · L46-L52
- **Do:** Add optional field effects?: { id: string; type: 'dust'|'ambientLight'; asset?: string; count?: number; color?: number; alpha?: number }[] to SceneDef.
- **Expected:** SceneDef accepts effects

### Step 3 — `game/src/entities/effects.ts` · `new: createEffects` · new
- **Do:** Export createEffects(ctx: RenderContext, defs: SceneDef['effects'], resolveTexture): DisplayHandle[]; for type dust call ctx.addParticles(resolveTexture(def.asset), def.count ?? 20) and setDepth(layerDepth('effects')); for ambientLight call ctx.addOverlay(def.color ?? 0xffb347, def.alpha ?? 0.15) and setDepth(layerDepth('effects')).
- **Expected:** One handle per effect def

### Step 4 — `game/src/engine/transition.ts` · `new: runTransition` · new
- **Do:** Export runTransition(ctx: RenderContext, swap: () => void, durationMs = 400): void calling ctx.fade('out', durationMs, () => { swap(); ctx.fade('in', durationMs, () => {}); }).
- **Expected:** Order fade out, swap, fade in

### Step 5 — `game/src/scenes/buildScene.ts` · `buildScene` · new
- **Do:** After creating entities, call createEffects(ctx, scene.effects ?? [], resolveTexture) and include the handles in BuiltScene.destroy().
- **Expected:** Effects created and cleaned up

### Step 6 — `game/src/content/worlds/the-boys-room/scenes/bedroom.yaml` · `effects` · after L10
- **Do:** Add top-level effects list with {id: dust, type: dust, asset: effects/dust, count: 24} and {id: warm-light, type: ambientLight, color: 16758855, alpha: 0.12}; confirm the dust manifest id by reading manifest.json before writing.
- **Expected:** Bedroom loads with two effects

### Step 7 — `game/frontend/src/phaser/WorldScene.ts` · `WorldScene.create` · new
- **Do:** Subscribe reactToPhaser 'transitionTo' and call runTransition(ctx, () => rebuild scene for the sceneId) ; unsubscribe on SHUTDOWN.
- **Expected:** transitionTo triggers faded rebuild

## Acceptance criteria
- Scenes without effects parse with an empty effects list and effect entries create dust and overlay handles
- runTransition calls fade out, then swap, then fade in

## Definition of done
- Typechecks
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-471.md`

## Scan baseline
- Scan version: `v1`
- Scan tip: `9cda5131c65b08541fc685d8a0898d39a0e9e9fa`

## Links
- Evidence: EVD-095
- Requirement: REQ-237
- Unit (Act): UNIT-471
- Unit (Verify): UNIT-475
- Status: approved
- Change: UPDATE
