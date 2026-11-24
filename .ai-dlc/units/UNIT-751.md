# UNIT-751 — Act: Unsubscribe transitionTo in the BootScene SHUTDOWN handler

## Summary
Release the transitionTo subscription on shutdown

## Description
In the SHUTDOWN callback in BootScene.create, call and null the unsubscribeTransition function next to the playAnimation release.

## How to act
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/src/phaser/BootScene.ts` · `BootScene.create SHUTDOWN callback` · L88-L89
- **Do:** After this.unsubscribeAnimation = null, add a call to this.unsubscribeTransition?.() and set this.unsubscribeTransition = null.

```
this.unsubscribeTransition?.();
this.unsubscribeTransition = null;
```

- **Expected:** Subscription is released on SHUTDOWN.

## Acceptance criteria
- After SHUTDOWN, transitionTo no longer reaches BootScene
- Other subscribers stay registered

## Definition of done
- Unsubscribe called and set to null
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-751.md`

## Scan baseline
- Scan version: `v1`
- Scan tip: `9cda5131c65b08541fc685d8a0898d39a0e9e9fa`

## Links
- Evidence: EVD-152
- Requirement: REQ-376
- Unit (Act): UNIT-751
- Unit (Verify): UNIT-753
- Status: approved
- Change: UPDATE
