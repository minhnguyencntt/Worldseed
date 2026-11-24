# UNIT-399 — Verify: Zustand game store, useGame and BootScene state reading unit tests

## Summary
Unit tests prove a single state owner and subscription cleanup.

## Description
Test gameStore, useGame and BootScene with phaser mocked.

## How to verify
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/tests/bootScene.test.ts` · `new: BootScene tests` · new
- **Do:** vi.mock('phaser', ...) providing default {Scene: class {events = {once: vi.fn()}}, Scenes:{Events:{SHUTDOWN:'shutdown'}}}. Build a GameState with createInitialState from @game/state/gameState and the world and scene from ../src/runtime/content. Test (1) useGameStore.setState({state}) then new BootScene().readState() toBe(state); (2) after create(), setting a new state calls onStateChange (spy) and readState returns the new reference; (3) capture the once('shutdown') callback, invoke it, then change the store and assert onStateChange is not called; (4) phaserToReact listener receives sceneReady on create().
- **Run:** `cd game/frontend && npx vitest run tests/bootScene.test.ts`
- **Expected:** All four tests pass.

### Step 2 — `game/frontend/tests/gameStore.test.ts` · `new: gameStore tests` · new
- **Do:** Test init sets state once and a second init does not overwrite; setState applies the updater to the current state. Reset the store with useGameStore.setState({state:null}) in beforeEach.
- **Run:** `cd game/frontend && npx vitest run tests/gameStore.test.ts tests/useGame.test.tsx`
- **Expected:** Store tests and existing useGame tests pass with the unchanged return shape.

## Acceptance criteria
- Given store state, Then BootScene.readState returns the same reference.
- Given shutdown, Then unsubscribe is called.

## Definition of done
- New tests and useGame.test.tsx pass
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-399.md`

## Links
- Evidence: EVD-078
- Requirement: REQ-199
- Unit (Act): UNIT-396
- Unit (Verify): UNIT-399
- Status: completed
- Change: UPDATE
