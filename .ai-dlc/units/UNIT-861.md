# UNIT-861 — Act: Guard the BootScene transitionTo handler

## Summary
Ignore empty or unknown sceneId

## Description
Add an early return in the transitionTo subscriber.

## How to act
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/src/phaser/BootScene.ts` · `BootScene.create transitionTo handler` · L77-L81
- **Do:** At the top of the reactToPhaser.on('transitionTo') callback add a guard returning when sceneId is empty or this.scene.get(sceneId) is falsy, before the camera lines.

```
if (!sceneId || !this.scene.get(sceneId)) return;
```

- **Expected:** Empty and unknown ids do nothing

## Acceptance criteria
- Given empty or unknown id, when handled, then nothing happens
- Given a known id, when handled, then fade and start occur

## Definition of done
- Guard in place
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-861.md`

## Scan baseline
- Scan version: `v1`
- Scan tip: `9cda5131c65b08541fc685d8a0898d39a0e9e9fa`

## Links
- Evidence: EVD-172
- Requirement: REQ-432
- Unit (Act): UNIT-861
- Unit (Verify): UNIT-866
- Status: completed
- Change: UPDATE
