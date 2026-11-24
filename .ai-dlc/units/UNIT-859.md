# UNIT-859 — Act: Emit playAnimation interact from the App action handler

## Summary
Add handleAction in App and pass it to ObjectOverlay

## Description
Create handleAction that calls game.act then emits playAnimation for the boy.

## How to act
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/src/App.tsx` · `import { phaserToReact }` · L16
- **Do:** Change the events import to also import reactToPhaser.

```
import { phaserToReact } from './phaser/events'; -> import { phaserToReact, reactToPhaser } from './phaser/events';
```

- **Expected:** reactToPhaser is available in App

### Step 2 — `game/frontend/src/App.tsx` · `App.handleAction` · after L68
- **Do:** Add const handleAction = (objectId: string, actionId: string) => { game.act(objectId, actionId); reactToPhaser.emit('playAnimation', { target: 'boy', name: 'interact' }); }; placed before the return of the playing view (after the !begun early return).

```
const handleAction = (objectId: string, actionId: string) => { game.act(objectId, actionId); reactToPhaser.emit('playAnimation', { target: 'boy', name: 'interact' }); };
```

- **Expected:** Handler defined

### Step 3 — `game/frontend/src/App.tsx` · `ObjectOverlay onAction prop` · L98
- **Do:** Replace onAction={game.act} with onAction={handleAction}.

```
onAction={game.act} -> onAction={handleAction}
```

- **Expected:** Actions emit the animation event

## Acceptance criteria
- Given handleAction, when called, then game.act runs and playAnimation interact is emitted
- Given ObjectOverlay, when rendered, then onAction is handleAction

## Definition of done
- Overlay uses handleAction
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-859.md`

## Scan baseline
- Scan version: `v1`
- Scan tip: `9cda5131c65b08541fc685d8a0898d39a0e9e9fa`

## Links
- Evidence: EVD-172
- Requirement: REQ-430
- Unit (Act): UNIT-859
- Unit (Verify): UNIT-864
- Status: completed
- Change: UPDATE
