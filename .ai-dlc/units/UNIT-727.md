# UNIT-727 — Act: Clear non-matching focus and call applyFocusedObject from onStateChange

## Summary
Blur other focused objects and apply store focus on every store change

## Description
Extend applyFocusedObject to blur focused objects that do not match (all of them when id is null) and call it from onStateChange with useGameStore.getState().focusedObjectId before the null-state early return.

## How to act
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/src/phaser/BootScene.ts` · `BootScene.applyFocusedObject` · after L134
- **Do:** Add an else-if branch inside the forEach so that an object that isFocused and whose spec.id !== id gets blur() called.

```
if (id !== null && o.spec.id === id) { if (!o.isFocused) o.focus(); }
else if (o.isFocused) o.blur();
```

- **Expected:** Null or non-matching id blurs previously focused objects

### Step 2 — `game/frontend/src/phaser/BootScene.ts` · `BootScene.onStateChange` · L130-L134
- **Do:** Insert this.applyFocusedObject(useGameStore.getState().focusedObjectId) as the first statement, before const state = this.readState() and its early return.

```
onStateChange(): void {
  this.applyFocusedObject(useGameStore.getState().focusedObjectId);
  const state = this.readState();
  if (!state) return;
  this.sceneObjects.forEach((o) => o.sync(state));
}
```

- **Expected:** Every store notification applies the store focus to the scene objects

## Acceptance criteria
- With focusedObjectId null, focused objects get blur() on store change
- Focus application still runs when GameState is null

## Definition of done
- Store focus changes drive highlight and clear on null
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-727.md`

## Scan baseline
- Scan version: `v1`
- Scan tip: `9cda5131c65b08541fc685d8a0898d39a0e9e9fa`

## Links
- Evidence: EVD-146
- Requirement: REQ-364
- Unit (Act): UNIT-727
- Unit (Verify): UNIT-729
- Status: approved
- Change: UPDATE
