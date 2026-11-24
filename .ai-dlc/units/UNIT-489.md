# UNIT-489 — Act: Add EffectRenderContext and buildEffects

## Summary
Create effect builder in engine

## Description
Add effect context types and buildEffects.

## How to act
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/src/engine/renderContext.ts` · `new: EffectHandle, EffectRenderContext` · after L22
- **Do:** Append interface EffectHandle { destroy(): void } and interface EffectRenderContext { createEffect(spec: EffectSpec & { depth: number }): EffectHandle; playTransition(durationMs: number): void } with `import type { EffectSpec } from '../content/schema'` at top
- **Expected:** Types exported, RenderContext untouched

### Step 2 — `game/src/engine/buildEffects.ts` · `new: buildEffects` · new
- **Do:** Export buildEffects(ctx: EffectRenderContext, scene: SceneSpec): EffectHandle[]; for each effect of scene.effects ?? []: if type is 'transition' call ctx.playTransition(e.durationMs) else push ctx.createEffect({ ...e, depth: layerDepth('effects') }); return the handles

```
import { layerDepth } from './layers';
```

- **Expected:** Returns handles for dust and light only

## Acceptance criteria
- buildEffects returns handles for dust and ambient light only
- buildEffects plays the fade transition through the context

## Definition of done
- Module compiles
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-489.md`

## Scan baseline
- Scan version: `v1`
- Scan tip: `9cda5131c65b08541fc685d8a0898d39a0e9e9fa`

## Links
- Evidence: EVD-098
- Requirement: REQ-245
- Unit (Act): UNIT-489
- Unit (Verify): UNIT-492
- Status: completed
- Change: NEW
