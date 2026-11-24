# UNIT-860 — Act: Emit transitionTo from handleAction when currentScene changes

## Summary
Compare currentScene before and after game.act

## Description
Extend handleAction (added by the interact Act) to read the store scene id before and after and emit transitionTo on change.

## How to act
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/src/App.tsx` · `App.handleAction` · handleAction body
- **Do:** Read const before = useGameStore.getState().state.currentScene before game.act, and after the playAnimation emit read const after the same way; when after !== before emit reactToPhaser.emit('transitionTo', { sceneId: after }).

```
const before = useGameStore.getState().state.currentScene; game.act(objectId, actionId); reactToPhaser.emit('playAnimation', { target: 'boy', name: 'interact' }); const after = useGameStore.getState().state.currentScene; if (after !== before) reactToPhaser.emit('transitionTo', { sceneId: after });
```

- **Expected:** transitionTo emitted only on a scene change

## Acceptance criteria
- Given a changed currentScene, when handleAction runs, then transitionTo is emitted with it
- Given no change, when it runs, then no transitionTo

## Definition of done
- Emission conditional
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-860.md`

## Scan baseline
- Scan version: `v1`
- Scan tip: `9cda5131c65b08541fc685d8a0898d39a0e9e9fa`

## Links
- Evidence: EVD-172
- Requirement: REQ-431
- Unit (Act): UNIT-860
- Unit (Verify): UNIT-865
- Status: completed
- Change: UPDATE
