# UNIT-747 — Act: Unsubscribe playAnimation in the BootScene SHUTDOWN handler

## Summary
Release the playAnimation subscription and clear character map on shutdown

## Description
Call the stored unsubscribe in the SHUTDOWN handler.

## How to act
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/src/phaser/BootScene.ts` · `BootScene.create SHUTDOWN handler` · L73-L83
- **Do:** At the start of the SHUTDOWN callback call this.unsubscribeAnimation?.(); set this.unsubscribeAnimation = null; and after characterSprites reset call this.characterAnims.clear().

```
this.unsubscribeAnimation?.();
this.unsubscribeAnimation = null;
...
this.characterAnims.clear();
```

- **Expected:** Emitting playAnimation after SHUTDOWN triggers no sprite.play

## Acceptance criteria
- After shutdown playAnimation no longer reaches the scene
- Character map is cleared

## Definition of done
- Shutdown releases the subscription
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-747.md`

## Scan baseline
- Scan version: `v1`
- Scan tip: `9cda5131c65b08541fc685d8a0898d39a0e9e9fa`

## Links
- Evidence: EVD-151
- Requirement: REQ-374
- Unit (Act): UNIT-747
- Unit (Verify): UNIT-749
- Status: completed
- Change: UPDATE
