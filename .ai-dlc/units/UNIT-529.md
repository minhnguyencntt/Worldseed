# UNIT-529 — Verify: BootScene state sync and objectClick forwarding

## Summary
Unit tests for sync on store change and click emission

## Description
With buildScene mocked to return fake objects, assert sync and objectClick behavior.

## How to verify
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/tests/bootSceneSync.test.ts` · `new: sync and null state` · new
- **Do:** Mock phaser, buildScene (returns one fake object {sync, destroy, onInteract: vi.fn()}), buildEffects, playSceneTransition, renderContext. Set useGameStore state to createInitialState(world, scene) from '@game/state/gameState'; create(); assert sync called with that state. Then setState to a second state, call boot.onStateChange(), assert sync called with the second. Then setState({state:null}), call onStateChange(), assert call count unchanged.
- **Run:** `cd game/frontend && npx vitest run tests/bootSceneSync.test.ts -t 'sync'`
- **Expected:** Test passes

### Step 2 — `game/frontend/tests/bootSceneSync.test.ts` · `new: objectClick forwarding` · new
- **Do:** vi.spyOn(phaserToReact, 'emit'); after create(), take the callback passed to the fake object's onInteract and invoke it with {objectId:'abc', actions:[]}; assert emit called with ('objectClick', {id:'abc'}).
- **Run:** `cd game/frontend && npx vitest run tests/bootSceneSync.test.ts`
- **Expected:** All tests in the file pass

## Acceptance criteria
- create syncs with non-null state
- onStateChange syncs new state and ignores null
- onInteract emits objectClick

## Definition of done
- Tests pass
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-529.md`

## Links
- Evidence: EVD-106
- Requirement: REQ-264
- Unit (Act): UNIT-526
- Unit (Verify): UNIT-529
- Status: completed
- Change: UPDATE
