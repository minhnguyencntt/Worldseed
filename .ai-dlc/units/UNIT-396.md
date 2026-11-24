# UNIT-396 — Act: Add the Zustand game store, move useGame onto it and add BootScene

## Summary
Store GameState in Zustand; BootScene reads it without copying.

## Description
Create gameStore, refactor useGame to use it and add a Phaser scene that reads from it.

## How to act
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/src/store/gameStore.ts` · `new: useGameStore` · new
- **Do:** Create a zustand store with interface GameStoreState {state: GameState | null; setState: (updater: (prev: GameState) => GameState) => void; init: (s: GameState) => void}. init sets state only when state is null; setState applies updater to the current non-null state.

```
import { create } from 'zustand';
import type { GameState } from '@game/state/types';
```

- **Expected:** useGameStore.getState().state is null until init is called.

### Step 2 — `game/frontend/src/runtime/useGame.ts` · `useGame` · L16-L35
- **Do:** Remove the useState call. Compute the initial value readSaved() ?? createInitialState(world, scene) and call useGameStore.getState().init(initial) before reading. Select state with useGameStore((s)=>s.state) as GameState. Keep the writeSaved useEffect on state. Change act to useGameStore.getState().setState((prev)=>performAction(prev, scene, objectId, actionId)) and choose to the equivalent with chooseOption. Keep the return object keys unchanged.

```
before: setState((prev) => performAction(...)) -> after: useGameStore.getState().setState((prev) => performAction(prev, scene, objectId, actionId))
```

- **Expected:** useGame returns the same keys and updates through the store.

### Step 3 — `game/frontend/src/phaser/BootScene.ts` · `new: BootScene` · new
- **Do:** Create class BootScene extends Phaser.Scene with constructor super('BootScene'), private unsubscribe: (() => void) | null = null (not state), readState(): GameState | null returning useGameStore.getState().state, create() that subscribes with this.unsubscribe = useGameStore.subscribe(() => this.onStateChange()) and emits phaserToReact.emit('sceneReady',{sceneId:'boot'}), onStateChange() that calls this.readState(), and in create registers this.events.once(Phaser.Scenes.Events.SHUTDOWN, () => {this.unsubscribe?.(); this.unsubscribe = null;}).
- **Expected:** BootScene never stores a GameState field and unsubscribes on shutdown.

## Acceptance criteria
- Given useGame, When read, Then state comes from useGameStore.
- Given BootScene, When read, Then it keeps no GameState field.

## Definition of done
- tsc --noEmit passes
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-396.md`

## Scan baseline
- Scan version: `v1`
- Scan tip: `9cda5131c65b08541fc685d8a0898d39a0e9e9fa`

## Links
- Evidence: EVD-078
- Requirement: REQ-199
- Unit (Act): UNIT-396
- Unit (Verify): UNIT-399
- Status: completed
- Change: UPDATE
