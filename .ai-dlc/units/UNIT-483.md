# UNIT-483 — Act: Extend RenderHandle and SceneObject with hover, label and click

## Summary
Add pointer interaction to the entity

## Description
Extend RenderSpriteSpec and RenderHandle, and add hover state, last-synced state and an interact listener to SceneObject.

## How to act
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/src/engine/renderContext.ts` · `RenderSpriteSpec, RenderHandle` · L1-L3
- **Do:** Add optional label?: string and bounds?: {x:number;y:number;width:number;height:number} to RenderSpriteSpec; add to RenderHandle: setHighlighted(on: boolean): void; setLabelVisible(on: boolean): void; onHover(cb: (over: boolean) => void): void; onClick(cb: () => void): void

```
RenderHandle { setVisible; destroy; setHighlighted(on: boolean): void; setLabelVisible(on: boolean): void; onHover(cb: (over: boolean) => void): void; onClick(cb: () => void): void }
```

- **Expected:** Interfaces compile with the new members

### Step 2 — `game/src/entities/SceneObject.ts` · `SceneObject constructor` · L11-L22
- **Do:** Pass label: spec.name and bounds: spec.interactionBounds in the createSprite argument; then register this.handle.onHover(over => { if (!this.visible) return; this.handle.setHighlighted(over); this.handle.setLabelVisible(over); }) and this.handle.onClick(() => this.activate())
- **Expected:** Hover and click wired at construction

### Step 3 — `game/src/entities/SceneObject.ts` · `SceneObject.sync, onInteract, activate` · L24-L26
- **Do:** Add private visible = true, private lastState?: GameState and private listener?: (e:{objectId:string; actions:ActionSpec[]}) => void; sync stores state, sets visible = evaluateAll(...), calls setVisible(visible) and, when hidden, setHighlighted(false) and setLabelVisible(false); add onInteract(cb) setting the listener; add activate(): when visible and lastState defined, call listener with {objectId: spec.id, actions: availableActions(lastState, spec)}
- **Expected:** Visible clicks emit, hidden clicks do not

## Acceptance criteria
- RenderHandle exposes setHighlighted, setLabelVisible, onHover, onClick
- SceneObject.onInteract registers a listener fired on visible clicks

## Definition of done
- tsc --noEmit passes for game/src
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-483.md`

## Scan baseline
- Scan version: `v1`
- Scan tip: `9cda5131c65b08541fc685d8a0898d39a0e9e9fa`

## Links
- Evidence: EVD-097
- Requirement: REQ-242
- Unit (Act): UNIT-483
- Unit (Verify): UNIT-486
- Status: completed
- Change: UPDATE
