# UNIT-743 — Act: Emit playAnimation and transitionTo from App game actions

## Summary
Wrap game.act in App to emit reactToPhaser events

## Description
App passes a wrapped action handler to ActionMenu that performs game.act then emits playAnimation for the boy and emits transitionTo when the scene id changed.

## How to act
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/src/App.tsx` · `App` · L2-L12
- **Do:** Change the events import to also import reactToPhaser: import { phaserToReact, reactToPhaser } from './phaser/events'.

```
import { phaserToReact, reactToPhaser } from './phaser/events';
```

- **Expected:** reactToPhaser is available in App

### Step 2 — `game/frontend/src/App.tsx` · `App.handleAction` · after L52
- **Do:** Add handleAction(objectId, actionId): record the previous scene id from game.state.sceneId, call game.act(objectId, actionId), emit reactToPhaser 'playAnimation' {target:'boy', name:'interact'}; read the new scene id from useGameStore.getState().state?.sceneId and, when it differs from the previous one, emit 'transitionTo' {sceneId}. Import useGameStore from './store/gameStore'. Pass onAction={handleAction} to ActionMenu in place of game.act.

```
const handleAction = (objectId: string, actionId: string) => { const prev = game.state.sceneId; game.act(objectId, actionId); reactToPhaser.emit('playAnimation', { target: 'boy', name: 'interact' }); const next = useGameStore.getState().state?.sceneId; if (next && next !== prev) reactToPhaser.emit('transitionTo', { sceneId: next }); };
```

- **Expected:** ActionMenu actions emit the Phaser commands

## Acceptance criteria
- Choosing an action emits playAnimation boy interact
- A changed scene id emits transitionTo

## Definition of done
- App emits both events
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-743.md`

## Scan baseline
- Scan version: `v1`
- Scan tip: `9cda5131c65b08541fc685d8a0898d39a0e9e9fa`

## Links
- Evidence: EVD-150
- Requirement: REQ-372
- Unit (Act): UNIT-743
- Unit (Verify): UNIT-745
- Status: approved
- Change: UPDATE
