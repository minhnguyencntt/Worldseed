# UNIT-851 — Act: Emit objectHover and build the anchored ObjectOverlay in App

## Summary
Emit objectHover from BootScene and render ObjectOverlay with plate and action buttons driven by content.

## Description
BootScene emits objectHover on SceneObject hover; new ObjectOverlay component uses anchorFor and game.view; App renders it in place of ActionMenu and passes onLayout.

## How to act
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/src/entities/SceneObject.ts` · `SceneObject.onHoverChange` · after L84
- **Do:** Add method onHoverChange(cb:(e:{objectId:string;over:boolean})=>void) storing a private hoverListener; in the constructor handle.onHover callback (L33-L37) call this.hoverListener?.({objectId:this.spec.id, over}) after the highlight calls.

```
this.hoverListener?.({ objectId: this.spec.id, over });
```

- **Run:** `cd game/frontend && npx tsc --noEmit`
- **Expected:** type-checks

### Step 2 — `game/frontend/src/phaser/BootScene.ts` · `BootScene.create` · L66-L67
- **Do:** After the onInteract line add sceneObjects.forEach to call o.onHoverChange(e => phaserToReact.emit('objectHover',{id: e.over ? e.objectId : null})).

```
this.sceneObjects.forEach((o) => o.onHoverChange((e) => phaserToReact.emit('objectHover', { id: e.over ? e.objectId : null })));
```

- **Run:** `cd game/frontend && npx tsc --noEmit`
- **Expected:** type-checks

### Step 3 — `game/frontend/src/phaser/renderContext.ts` · `createPhaserRenderContext.createSprite` · L16-L21
- **Do:** Change the bounded branch to call image.setInteractive(new Phaser.Geom.Rectangle(x,y,width,height), Phaser.Geom.Rectangle.Contains) then image.input.cursor = 'pointer' guarded by image.input being defined, so the hand cursor is used for bounded objects too.

```
if (image.input) image.input.cursor = 'pointer';
```

- **Run:** `cd game/frontend && npx tsc --noEmit`
- **Expected:** type-checks

### Step 4 — `game/frontend/src/components/ObjectOverlay.tsx` · `new: ObjectOverlay` · new
- **Do:** Create component ObjectOverlay({view, objectsSpec, layout, activeId, onAction}). Find the object in view by activeId, find its ObjectSpec (position, scale, interactionBounds) from scene.objects in runtime/content, compute anchorFor with layout, and render an absolutely positioned Frame kind='plaque' showing name.toUpperCase() above top point and a Frame with one Button per action (label upper-cased) beneath bottom point. Return null when no active object, no anchor or no layout. Button onClick calls onAction(object.id, action.id).
- **Run:** `cd game/frontend && npx tsc --noEmit`
- **Expected:** component type-checks

### Step 5 — `game/frontend/src/App.tsx` · `App` · L5-L9, L44-L46, L72-L77
- **Do:** Remove ActionMenu import and render. Add state hoverId (set from phaserToReact.on('objectHover')) and layout (set from PhaserHost onLayout). Compute activeId = hoverId ?? focusedObjectId from useGameStore, keep selectedId set by objectClick. Render <ObjectOverlay .../> inside the scene slot and pass onLayout to PhaserHost.
- **Run:** `cd game/frontend && npx tsc --noEmit`
- **Expected:** App type-checks and renders ObjectOverlay

## Acceptance criteria
- objectHover emits {id} on hover over and {id:null} on out
- ObjectOverlay shows upper-case name and action buttons for the hovered or focused object

## Definition of done
- Overlay visible for hover and focus
- game.act called on button click
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-851.md`

## Scan baseline
- Scan version: `v1`
- Scan tip: `9cda5131c65b08541fc685d8a0898d39a0e9e9fa`

## Links
- Evidence: EVD-171
- Requirement: REQ-426
- Unit (Act): UNIT-851
- Unit (Verify): UNIT-855
- Status: completed
- Change: UPDATE
