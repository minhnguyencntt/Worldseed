# UNIT-735 — Act: Order unsubscribe before the focus reset in the SHUTDOWN handler

## Summary
Confirm the handler releases the subscription before the store focus reset.

## Description
Ensure the handler sequence is blur, unsubscribe, null, setFocusedObject(null), then destroy, so store updates after unsubscribe never reach the scene.

## How to act
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/src/phaser/BootScene.ts` · `BootScene.create SHUTDOWN callback` · L73-L83
- **Do:** Check that this.unsubscribe?.() and this.unsubscribe = null appear before the setFocusedObject(null) call, and move the setFocusedObject call below them if it is not.
- **Expected:** Order is blur, unsubscribe, unsubscribe = null, setFocusedObject(null), destroy calls.

## Acceptance criteria
- Unsubscribe runs before setFocusedObject(null).
- this.unsubscribe is null after shutdown.

## Definition of done
- Order verified in source
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-735.md`

## Scan baseline
- Scan version: `v1`
- Scan tip: `9cda5131c65b08541fc685d8a0898d39a0e9e9fa`

## Links
- Evidence: EVD-148
- Requirement: REQ-368
- Unit (Act): UNIT-735
- Unit (Verify): UNIT-737
- Status: approved
- Change: UPDATE
