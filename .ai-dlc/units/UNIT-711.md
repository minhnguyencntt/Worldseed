# UNIT-711 — Act: Add keyboard handler to BootScene.create and release it on shutdown

## Summary
Wire keys to moveFocus, handleKey and events

## Description
Add a private onKeyDown method and register it in create, unregister in the SHUTDOWN handler.

## How to act
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/src/phaser/BootScene.ts` · `import block` · L12
- **Do:** Change the buildScene import to also import moveFocus.

```
import { buildScene, moveFocus } from '@game/engine/buildScene';
```

- **Expected:** moveFocus is available in BootScene.

### Step 2 — `game/frontend/src/phaser/BootScene.ts` · `BootScene.onKeyDown` · after L131 (end of onStateChange)
- **Do:** Add a private arrow property onKeyDown = (e: KeyboardEvent): void that: for 'Tab' (e.shiftKey ? -1 : 1), 'ArrowRight'/'ArrowDown' (+1), 'ArrowLeft'/'ArrowUp' (-1) calls e.preventDefault(), moveFocus(this.sceneObjects, delta) and emits focusChange with the id of the object whose isFocused is true (or null); for 'Enter' or ' ' calls handleKey(e.key) on every object in sceneObjects; for 'Escape' emits menuClose with {}.

```
private onKeyDown = (e: KeyboardEvent): void => {
  const delta = e.key === 'Tab' ? (e.shiftKey ? -1 : 1) : e.key === 'ArrowRight' || e.key === 'ArrowDown' ? 1 : e.key === 'ArrowLeft' || e.key === 'ArrowUp' ? -1 : 0;
  if (delta !== 0) {
    e.preventDefault();
    moveFocus(this.sceneObjects, delta);
    phaserToReact.emit('focusChange', { id: this.sceneObjects.find((o) => o.isFocused)?.spec.id ?? null });
  } else if (e.key === 'Enter' || e.key === ' ') this.sceneObjects.forEach((o) => o.handleKey(e.key));
  else if (e.key === 'Escape') phaserToReact.emit('menuClose', {});
};
```

- **Expected:** Method compiles with delta typed as 1 | -1 | 0 narrowed before moveFocus (cast delta as 1 | -1).

### Step 3 — `game/frontend/src/phaser/BootScene.ts` · `BootScene.create` · L65-L81
- **Do:** After the characterSprites assignment add this.input.keyboard?.on('keydown', this.onKeyDown); inside the SHUTDOWN handler add this.input.keyboard?.off('keydown', this.onKeyDown) before this.unsubscribe?.().
- **Expected:** Listener registered on create and removed on shutdown.

## Acceptance criteria
- Navigation keys call moveFocus and emit focusChange.
- Enter/Space call handleKey on the focused object.
- Escape emits menuClose.
- The listener is off()'d on shutdown.

## Definition of done
- BootScene handles the five key groups
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-711.md`

## Scan baseline
- Scan version: `v1`
- Scan tip: `9cda5131c65b08541fc685d8a0898d39a0e9e9fa`

## Links
- Evidence: EVD-143
- Requirement: REQ-356
- Unit (Act): UNIT-711
- Unit (Verify): UNIT-714
- Status: completed
- Change: UPDATE
