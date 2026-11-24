# UNIT-526 — Act: Sync SceneObjects with the store and emit objectClick

## Summary
Wire sync and onInteract in BootScene

## Description
After building objects, BootScene syncs them with the store state and forwards activations to phaserToReact.

## How to act
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/src/phaser/BootScene.ts` · `BootScene.create` · L47-L60
- **Do:** After building sceneObjects, for each object call o.onInteract((e) => phaserToReact.emit('objectClick', { id: e.objectId })), then call this.onStateChange().

```
this.sceneObjects.forEach((o) => o.onInteract((e) => phaserToReact.emit('objectClick', { id: e.objectId })));
this.onStateChange();
```

- **Expected:** Activations reach the bus and initial sync happens

### Step 2 — `game/frontend/src/phaser/BootScene.ts` · `BootScene.onStateChange` · L62-L64
- **Do:** Replace the body: const state = this.readState(); if (!state) return; this.sceneObjects.forEach((o) => o.sync(state));

```
const state = this.readState();
if (!state) return;
this.sceneObjects.forEach((o) => o.sync(state));
```

- **Expected:** Null state is ignored; non-null state syncs every object

## Acceptance criteria
- sync runs in create and on each store change with non-null state
- onInteract emits objectClick

## Definition of done
- Store changes reach every SceneObject
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-526.md`

## Scan baseline
- Scan version: `v1`
- Scan tip: `9cda5131c65b08541fc685d8a0898d39a0e9e9fa`

## Links
- Evidence: EVD-106
- Requirement: REQ-264
- Unit (Act): UNIT-526
- Unit (Verify): UNIT-529
- Status: completed
- Change: UPDATE
