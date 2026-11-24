# UNIT-478 — Act: Add buildScene step

## Summary
Create buildScene from content

## Description
Create game/src/engine/buildScene.ts that builds SceneObjects from a SceneSpec.

## How to act
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/src/engine/buildScene.ts` · `new: buildScene` · new
- **Do:** Export buildScene(ctx: RenderContext, scene: SceneSpec): SceneObject[] that maps scene.objects to new SceneObject(obj, ctx) and returns them with Array.prototype.sort by depth ascending (stable, so same-layer order follows content order).

```
export function buildScene(ctx: RenderContext, scene: SceneSpec): SceneObject[] {
  return scene.objects.map((o) => new SceneObject(o, ctx)).sort((a, b) => a.depth - b.depth);
}
```

- **Expected:** Function exported and typechecks

## Acceptance criteria
- One entity is created per scene object
- Entities are returned ordered by layer depth

## Definition of done
- Compiles under tsc
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-478.md`

## Scan baseline
- Scan version: `v1`
- Scan tip: `9cda5131c65b08541fc685d8a0898d39a0e9e9fa`

## Links
- Evidence: EVD-096
- Requirement: REQ-240
- Unit (Act): UNIT-478
- Unit (Verify): UNIT-481
- Status: completed
- Change: UPDATE
