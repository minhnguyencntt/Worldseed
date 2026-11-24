# UNIT-477 — Act: Add SceneObject entity

## Summary
Create the SceneObject class

## Description
Create game/src/entities/SceneObject.ts wrapping an ObjectSpec and a RenderHandle.

## How to act
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/src/entities/SceneObject.ts` · `new: SceneObject` · new
- **Do:** Define class SceneObject with readonly spec: ObjectSpec, readonly depth, private handle. Constructor(spec, ctx) computes depth with layerDepth(spec.layer) and calls ctx.createSprite({key: spec.asset, x: spec.position.x, y: spec.position.y, scale: spec.scale, depth}). sync(state: GameState) calls handle.setVisible(evaluateAll(state, spec.visibleWhen)). destroy() calls handle.destroy().

```
sync(state: GameState): void { this.handle.setVisible(evaluateAll(state, spec.visibleWhen)); }
```

- **Expected:** Class exported and typechecks

## Acceptance criteria
- Constructor creates one sprite at layer depth
- sync applies visibleWhen
- destroy releases handle

## Definition of done
- Compiles under tsc
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-477.md`

## Scan baseline
- Scan version: `v1`
- Scan tip: `9cda5131c65b08541fc685d8a0898d39a0e9e9fa`

## Links
- Evidence: EVD-096
- Requirement: REQ-239
- Unit (Act): UNIT-477
- Unit (Verify): UNIT-480
- Status: completed
- Change: UPDATE
