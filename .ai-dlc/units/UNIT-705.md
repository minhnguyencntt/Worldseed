# UNIT-705 — Act: Subscribe BootScene to highlightObject and release it on shutdown

## Summary
BootScene focuses the matching SceneObject on highlightObject and blurs others

## Description
Subscribe to reactToPhaser highlightObject in BootScene.create, apply focus or blur through SceneObject, and unsubscribe in the SHUTDOWN handler.

## How to act
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/src/phaser/BootScene.ts` · `BootScene fields and imports` · L5, L26-L31
- **Do:** Import reactToPhaser alongside phaserToReact from ./events and add a private field unsubscribeHighlight of type (() => void) | null initialised to null.

```
import { phaserToReact, reactToPhaser } from './events';
private unsubscribeHighlight: (() => void) | null = null;
```

- **Expected:** File compiles with the new import and field

### Step 2 — `game/frontend/src/phaser/BootScene.ts` · `BootScene.create` · after L73
- **Do:** Subscribe to highlightObject: for each scene object call focus() when spec.id equals the payload id, otherwise blur(); store the returned unsubscribe in unsubscribeHighlight.

```
this.unsubscribeHighlight = reactToPhaser.on('highlightObject', ({ id }) => this.sceneObjects.forEach((o) => (o.spec.id === id ? o.focus() : o.blur())));
```

- **Expected:** Emitting highlightObject focuses the matching object and null blurs all

### Step 3 — `game/frontend/src/phaser/BootScene.ts` · `BootScene.create SHUTDOWN handler` · L78-L81
- **Do:** Inside the SHUTDOWN callback call this.unsubscribeHighlight?.() and set it to null next to the existing unsubscribe release.

```
this.unsubscribeHighlight?.();
this.unsubscribeHighlight = null;
```

- **Expected:** After shutdown highlightObject no longer reaches scene objects

## Acceptance criteria
- highlightObject id focuses that object and blurs the rest
- null blurs all; handler removed on shutdown

## Definition of done
- highlightObject drives focus; no leak
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-705.md`

## Scan baseline
- Scan version: `v1`
- Scan tip: `9cda5131c65b08541fc685d8a0898d39a0e9e9fa`

## Links
- Evidence: EVD-142
- Requirement: REQ-353
- Unit (Act): UNIT-705
- Unit (Verify): UNIT-708
- Status: approved
- Change: UPDATE
