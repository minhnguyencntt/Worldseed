# UNIT-525 — Act: Build scene objects in BootScene.create via buildScene

## Summary
Export sceneSpec and call buildScene from BootScene

## Description
Add a validated sceneSpec export to runtime/content.ts and make BootScene.create build objects through buildScene with the Phaser render context, destroying them on shutdown.

## How to act
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/src/runtime/content.ts` · `new: sceneSpec` · after L28
- **Do:** Import sceneSchema and type SceneSpec from '@game/content/schema' and add an exported constant parsed from the same bedroom.yaml.

```
export const sceneSpec: SceneSpec = sceneSchema.parse(parseYaml<unknown>('scenes/bedroom.yaml'));
```

- **Expected:** sceneSpec exported alongside scene

### Step 2 — `game/frontend/src/phaser/BootScene.ts` · `BootScene fields and imports` · L1-L19
- **Do:** Import buildScene from '@game/engine/buildScene', SceneObject type from '@game/entities/SceneObject', createPhaserRenderContext from './renderContext', and sceneSpec from '../runtime/content'. Add field private sceneObjects: SceneObject[] = [];
- **Expected:** File compiles with new imports

### Step 3 — `game/frontend/src/phaser/BootScene.ts` · `BootScene.create` · L47-L60
- **Do:** After this.effects = buildEffects(ctx, scene), add this.sceneObjects = buildScene(createPhaserRenderContext(this, (id) => this.resolveKey(id)), sceneSpec). In the SHUTDOWN callback add this.sceneObjects.forEach((o) => o.destroy()); this.sceneObjects = [].

```
this.sceneObjects = buildScene(createPhaserRenderContext(this, (id) => this.resolveKey(id)), sceneSpec);
```

- **Expected:** Objects are built from content and destroyed on shutdown

## Acceptance criteria
- create calls buildScene(ctx, sceneSpec) once
- Shutdown destroys every built object

## Definition of done
- BootScene holds sceneObjects built from content only
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-525.md`

## Scan baseline
- Scan version: `v1`
- Scan tip: `9cda5131c65b08541fc685d8a0898d39a0e9e9fa`

## Links
- Evidence: EVD-106
- Requirement: REQ-263
- Unit (Act): UNIT-525
- Unit (Verify): UNIT-528
- Status: completed
- Change: UPDATE
