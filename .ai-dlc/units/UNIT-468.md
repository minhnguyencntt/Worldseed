# UNIT-468 — Act: Add layer order, render context, SceneObject entity and buildScene

## Summary
Create generic layered scene construction from SceneDef.

## Description
Implement the layer depth table, a structural RenderContext interface that Phaser adapts to, the SceneObject entity and buildScene that creates entities from getSceneView output. Add a thin Phaser WorldScene adapter.

## How to act
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/src/engine/layers.ts` · `new: LAYER_ORDER, LAYER_DEPTH, layerDepth` · new
- **Do:** Export LAYER_ORDER as the six layer names, LAYER_DEPTH mapping background 0, furniture 100, objects 200, characters 300, effects 400, ui 500, and layerDepth(layer?: string) returning the mapped depth or the objects depth for undefined or unknown names.

```
export const LAYER_ORDER = ['background','furniture','objects','characters','effects','ui'] as const;
export const LAYER_DEPTH: Record<(typeof LAYER_ORDER)[number], number> = { background:0, furniture:100, objects:200, characters:300, effects:400, ui:500 };
export const layerDepth = (l?: string): number => LAYER_DEPTH[l as keyof typeof LAYER_DEPTH] ?? LAYER_DEPTH.objects;
```

- **Expected:** layerDepth('furniture') is 100 and layerDepth('x') is 200

### Step 2 — `game/src/engine/renderContext.ts` · `new: RenderContext, DisplayHandle` · new
- **Do:** Declare interface DisplayHandle with setPosition(x,y), setScale(s), setDepth(d), setOrigin(x,y), setVisible(v), setTint(color), clearTint(), setInteractive(bounds?), on(event:'pointerover'|'pointerout'|'pointerdown', cb), destroy(); declare RenderContext with addImage(textureKey,x,y): DisplayHandle, addLabel(text,x,y): DisplayHandle, hasTexture(key): boolean, addOverlay(color,alpha): DisplayHandle, addParticles(textureKey,count): DisplayHandle, fade(direction:'in'|'out', durationMs:number, done:()=>void): void.
- **Expected:** Types compile; no runtime import of phaser

### Step 3 — `game/src/entities/SceneObject.ts` · `new: SceneObject` · new
- **Do:** Create class SceneObject constructed with (ctx: RenderContext, view: SceneObjectView, textureKey: string); it calls ctx.addImage(textureKey, view.position?.x ?? 0, view.position?.y ?? 0), setScale(view.scale ?? 1), setDepth(layerDepth(view.layer)); expose readonly id, layer, handle; add destroy() calling handle.destroy().
- **Expected:** Entity stores id and positioned handle

### Step 4 — `game/src/scenes/buildScene.ts` · `new: buildScene` · new
- **Do:** Export buildScene(ctx, scene: SceneDef, state: GameState, resolveTexture: (assetId?: string) => string): BuiltScene; call getSceneView(state, scene) from engine/scene.ts, map each view to new SceneObject(ctx, view, resolveTexture(view.asset)), sort by layerDepth with a stable sort, return {entities, destroy()} where destroy destroys all entities.
- **Expected:** One entity per visible object, ordered by depth

### Step 5 — `game/frontend/src/phaser/WorldScene.ts` · `new: WorldScene` · new
- **Do:** Create class WorldScene extends Phaser.Scene (key 'WorldScene') whose create() builds a RenderContext adapter over this.add.image/this.add.text, reads useGameStore.getState().state and runtime content scene, calls buildScene and stores the result; on SHUTDOWN call destroy().
- **Expected:** WorldScene instantiates and builds without error when Phaser is mocked

## Acceptance criteria
- buildScene returns entities sorted by layer depth
- WorldScene.create builds from the Zustand store state

## Definition of done
- Files compile under npm run typecheck
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-468.md`

## Scan baseline
- Scan version: `v1`
- Scan tip: `9cda5131c65b08541fc685d8a0898d39a0e9e9fa`

## Links
- Evidence: EVD-095
- Requirement: REQ-234
- Unit (Act): UNIT-468
- Unit (Verify): UNIT-472
- Status: approved
- Change: UPDATE
