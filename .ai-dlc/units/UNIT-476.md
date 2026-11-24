# UNIT-476 — Act: Add layers and renderContext engine modules

## Summary
Create layer order and render context interfaces

## Description
Create game/src/engine/layers.ts and game/src/engine/renderContext.ts reusing Layer from content/schema.ts.

## How to act
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/src/engine/layers.ts` · `new: LAYER_ORDER, layerDepth` · new
- **Do:** Export LAYER_ORDER as a readonly Layer array of the six layers and layerDepth(layer?: string) returning index*100, falling back to the objects index for undefined or unknown values.

```
import type { Layer } from '../content/schema';
export const LAYER_ORDER: readonly Layer[] = ['background','furniture','objects','characters','effects','ui'];
export function layerDepth(layer?: string): number {
  const i = LAYER_ORDER.indexOf(layer as Layer);
  return (i === -1 ? LAYER_ORDER.indexOf('objects') : i) * 100;
}
```

- **Expected:** Module compiles and exports both symbols

### Step 2 — `game/src/engine/renderContext.ts` · `new: RenderContext, RenderSpriteSpec, RenderHandle` · new
- **Do:** Export RenderSpriteSpec {key:string; x:number; y:number; scale:number; depth:number}, RenderHandle {setVisible(visible:boolean):void; destroy():void} and RenderContext {createSprite(spec: RenderSpriteSpec): RenderHandle}.

```
export interface RenderHandle { setVisible(visible: boolean): void; destroy(): void }
export interface RenderSpriteSpec { key: string; x: number; y: number; scale: number; depth: number }
export interface RenderContext { createSprite(spec: RenderSpriteSpec): RenderHandle }
```

- **Expected:** npx tsc --noEmit in game passes

## Acceptance criteria
- LAYER_ORDER lists six layers in order
- layerDepth is increasing and falls back to objects

## Definition of done
- Modules compile under tsc
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-476.md`

## Scan baseline
- Scan version: `v1`
- Scan tip: `9cda5131c65b08541fc685d8a0898d39a0e9e9fa`

## Links
- Evidence: EVD-096
- Requirement: REQ-238
- Unit (Act): UNIT-476
- Unit (Verify): UNIT-479
- Status: completed
- Change: UPDATE
