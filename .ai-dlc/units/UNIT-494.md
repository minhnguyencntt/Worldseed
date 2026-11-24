# UNIT-494 — Act: Add playSceneTransition engine helper

## Summary
Add playSceneTransition to the engine

## Description
Create game/src/engine/playSceneTransition.ts exporting playSceneTransition(ctx, scene) that finds the transition spec and calls ctx.playTransition(durationMs).

## How to act
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/src/engine/playSceneTransition.ts` · `new: playSceneTransition` · new
- **Do:** Create the file exporting playSceneTransition(ctx: EffectRenderContext, scene: SceneDef): void that finds the first entry of scene.effects ?? [] with type 'transition' and calls ctx.playTransition(spec.durationMs); returns without calling when none is found.

```
import type { SceneDef } from '../state/types';
import type { EffectRenderContext } from './renderContext';

export function playSceneTransition(ctx: EffectRenderContext, scene: SceneDef): void {
  const spec = (scene.effects ?? []).find((e) => e.type === 'transition');
  if (spec && spec.type === 'transition') ctx.playTransition(spec.durationMs);
}
```

- **Expected:** npx tsc --noEmit in game/ passes and the helper is importable

## Acceptance criteria
- Helper calls playTransition once with the durationMs of the first transition spec
- Helper does nothing when none exists

## Definition of done
- File exists and type-checks
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-494.md`

## Scan baseline
- Scan version: `v1`
- Scan tip: `9cda5131c65b08541fc685d8a0898d39a0e9e9fa`

## Links
- Evidence: EVD-099
- Requirement: REQ-247
- Unit (Act): UNIT-494
- Unit (Verify): UNIT-496
- Status: approved
- Change: UPDATE
