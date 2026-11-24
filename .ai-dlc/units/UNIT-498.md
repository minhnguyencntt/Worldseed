# UNIT-498 — Act: Add playSceneTransition engine helper

## Summary
Create the helper that reads the transition entry and calls playTransition.

## Description
Add game/src/engine/playSceneTransition.ts exporting playSceneTransition(ctx, scene) that calls ctx.playTransition with the durationMs of the first transition effect.

## How to act
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/src/engine/playSceneTransition.ts` · `new: playSceneTransition` · new
- **Do:** Create the file exporting playSceneTransition(ctx: EffectRenderContext, scene: SceneDef): void that finds the first entry of scene.effects with type 'transition' and calls ctx.playTransition(spec.durationMs); returns without calling when none is found.

```
import type { SceneDef } from '../state/types';
import type { EffectRenderContext } from './renderContext';

export function playSceneTransition(ctx: EffectRenderContext, scene: SceneDef): void {
  const spec = (scene.effects ?? []).find((e) => e.type === 'transition');
  if (spec && spec.type === 'transition') ctx.playTransition(spec.durationMs);
}
```

- **Expected:** Module exports playSceneTransition and type-checks.

## Acceptance criteria
- playSceneTransition calls ctx.playTransition(durationMs) for a scene with a transition spec.
- playSceneTransition makes no call when no transition spec exists.

## Definition of done
- Helper compiles under tsc
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-498.md`

## Scan baseline
- Scan version: `v1`
- Scan tip: `9cda5131c65b08541fc685d8a0898d39a0e9e9fa`

## Links
- Evidence: EVD-100
- Requirement: REQ-249
- Unit (Act): UNIT-498
- Unit (Verify): UNIT-500
- Status: completed
- Change: NEW
