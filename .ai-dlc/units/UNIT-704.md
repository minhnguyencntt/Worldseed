# UNIT-704 — Act: Add SceneObject.onHover and emit objectHover from BootScene

## Summary
SceneObject exposes a hover listener; BootScene forwards it to phaserToReact

## Description
Add a hoverListener to SceneObject invoked from the existing handle.onHover callback for visible objects, and register it in BootScene.create to emit objectHover.

## How to act
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/src/entities/SceneObject.ts` · `SceneObject (field + constructor hover handler + onHover method)` · L19-L22, L35-L39, after L88
- **Do:** Add a private field hoverListener, call it inside the existing handle.onHover callback after the visible check, and add a public onHover method that stores the callback.

```
private hoverListener?: (e: { objectId: string; over: boolean }) => void;
// in handle.onHover callback, after setLabelVisible(over):
this.hoverListener?.({ objectId: this.spec.id, over });
onHover(cb: (e: { objectId: string; over: boolean }) => void): void { this.hoverListener = cb; }
```

- **Expected:** SceneObject.onHover registers a listener called with objectId and over when a visible object is hovered

### Step 2 — `game/frontend/src/phaser/BootScene.ts` · `BootScene.create` · L72-L73
- **Do:** After the onInteract registration add an onHover registration that emits objectHover with the id when over is true and null when over is false.

```
this.sceneObjects.forEach((o) => o.onHover((e) => phaserToReact.emit('objectHover', { id: e.over ? e.objectId : null })));
```

- **Expected:** Hovering a scene object emits objectHover on phaserToReact

## Acceptance criteria
- SceneObject.onHover listener receives objectId and over for visible objects
- BootScene emits objectHover with id or null

## Definition of done
- Hover in and out emits objectHover
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-704.md`

## Scan baseline
- Scan version: `v1`
- Scan tip: `9cda5131c65b08541fc685d8a0898d39a0e9e9fa`

## Links
- Evidence: EVD-142
- Requirement: REQ-352
- Unit (Act): UNIT-704
- Unit (Verify): UNIT-707
- Status: approved
- Change: UPDATE
