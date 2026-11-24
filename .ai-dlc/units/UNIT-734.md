# UNIT-734 — Act: Blur focused objects and clear store focus in the BootScene SHUTDOWN handler

## Summary
Add blur and setFocusedObject(null) to the shutdown handler.

## Description
Edit the SHUTDOWN callback in BootScene.create so focused objects are blurred before destruction and the store focus is cleared after unsubscribing.

## How to act
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/src/phaser/BootScene.ts` · `BootScene.create SHUTDOWN callback` · L73-L83
- **Do:** Inside the callback, after the keyboard off call, blur each focused scene object; keep unsubscribe; then call useGameStore.getState().setFocusedObject(null) after this.unsubscribe is set to null and before sceneObjects is destroyed or emptied is NOT required, place it right after unsubscribe nulling.

```
this.sceneObjects.forEach((o) => { if (o.isFocused) o.blur(); });
this.unsubscribe?.();
this.unsubscribe = null;
useGameStore.getState().setFocusedObject(null);
```

- **Expected:** Shutdown blurs focused objects and sets focusedObjectId to null without re-entering onStateChange.

## Acceptance criteria
- Focused objects are blurred on shutdown.
- Store focusedObjectId is null after shutdown.

## Definition of done
- Handler blurs objects, unsubscribes, then calls setFocusedObject(null)
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-734.md`

## Scan baseline
- Scan version: `v1`
- Scan tip: `9cda5131c65b08541fc685d8a0898d39a0e9e9fa`

## Links
- Evidence: EVD-148
- Requirement: REQ-367
- Unit (Act): UNIT-734
- Unit (Verify): UNIT-736
- Status: approved
- Change: UPDATE
