# UNIT-484 — Act: Add focus, blur, handleKey and focus cycling

## Summary
Keyboard access in SceneObject and buildScene

## Description
Add focus API to SceneObject and a moveFocus helper exported from buildScene.ts.

## How to act
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/src/entities/SceneObject.ts` · `SceneObject.focus, blur, handleKey, isVisible, isFocused` · after activate method added in the previous unit
- **Do:** Add private focused = false; focus(): if visible set focused true, setHighlighted(true), setLabelVisible(true); blur(): set focused false, setHighlighted(false), setLabelVisible(false); handleKey(key: string): if focused && isActivationKey(key) call this.activate(); add getters isVisible() and isFocused(); import isActivationKey from '../systems/interaction'
- **Expected:** Focused objects activate on Enter and Space only

### Step 2 — `game/src/engine/buildScene.ts` · `new: moveFocus` · after L8
- **Do:** Export moveFocus(objects: SceneObject[], delta: 1 | -1): void: collect visible = objects.filter(o => o.isVisible()); current = visible.findIndex(o => o.isFocused()); next = nextFocusIndex(visible.length, current, delta) (when current is -1 and delta is 1 start at 0 by using current = -1 so result is 0); blur all objects; if next >= 0 call visible[next].focus(); import nextFocusIndex from '../systems/interaction'

```
const next = nextFocusIndex(visible.length, current, delta); objects.forEach((o) => o.blur()); if (next >= 0) visible[next].focus();
```

- **Expected:** Focus advances over visible objects and wraps

## Acceptance criteria
- SceneObject.handleKey emits on Enter/Space when focused
- moveFocus skips hidden objects and wraps

## Definition of done
- tsc --noEmit passes
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-484.md`

## Scan baseline
- Scan version: `v1`
- Scan tip: `9cda5131c65b08541fc685d8a0898d39a0e9e9fa`

## Links
- Evidence: EVD-097
- Requirement: REQ-243
- Unit (Act): UNIT-484
- Unit (Verify): UNIT-487
- Status: completed
- Change: NEW
