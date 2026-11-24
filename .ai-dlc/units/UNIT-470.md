# UNIT-470 — Act: Add hover, label, click, contextual actions and keyboard navigation

## Summary
Extend SceneObject and add the interaction system and WorldScene bus wiring.

## Description
Implement interaction behavior in SceneObject, pure focus and action helpers in systems/interaction.ts, and emit objectHover/objectClick from WorldScene.

## How to act
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/src/systems/interaction.ts` · `new: getContextActions, nextFocus` · new
- **Do:** Export getContextActions(state: GameState, obj: ObjectDef): ActionDef[] filtering obj.actions with evaluateAll(state, a.conditions); export nextFocus(ids: string[], current: string|null, dir: 1|-1): string|null returning null for empty ids, the first id when current is null or unknown, and wrapping modulo ids.length otherwise.
- **Expected:** Filtered actions and wrapping focus

### Step 2 — `game/src/entities/SceneObject.ts` · `SceneObject constructor, setHover, activate` · new
- **Do:** Add optional 4th constructor arg handlers {onHover(id|null), onClick(id)}; create a label via ctx.addLabel(view.name, x, y-8) hidden and depth layerDepth('ui'); when view.actions.length>0 call handle.setInteractive(view.interactionBounds) and register pointerover -> setHover(true), pointerout -> setHover(false), pointerdown -> activate(); setHover toggles setTint(0xffe9a8)/clearTint, label visibility and calls onHover(id|null); activate calls onClick(id); destroy also destroys the label.
- **Expected:** Hover and click behave per AC

### Step 3 — `game/src/scenes/buildScene.ts` · `buildScene` · new
- **Do:** Add optional 5th param handlers and pass it to each SceneObject; add focusNext(dir) and activateFocused() to BuiltScene using nextFocus over interactive entity ids, calling setHover on the focused entity and activate on Enter.
- **Expected:** Keyboard focus cycles entities

### Step 4 — `game/frontend/src/phaser/WorldScene.ts` · `WorldScene.create` · new
- **Do:** Pass handlers emitting phaserToReact.emit('objectHover', {id}) and ('objectClick', {id}); register this.input.keyboard Tab/Shift+Tab to built.focusNext(1/-1) and ENTER to built.activateFocused(); remove key listeners on SHUTDOWN.
- **Expected:** Bus events fire from pointer and keyboard

## Acceptance criteria
- Hover, pointerout and pointerdown on a SceneObject call onHover and onClick with the object id
- Keyboard focus cycling and Enter activation call the same handlers through the built scene

## Definition of done
- Typechecks
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-470.md`

## Scan baseline
- Scan version: `v1`
- Scan tip: `9cda5131c65b08541fc685d8a0898d39a0e9e9fa`

## Links
- Evidence: EVD-095
- Requirement: REQ-236
- Unit (Act): UNIT-470
- Unit (Verify): UNIT-474
- Status: approved
- Change: UPDATE
