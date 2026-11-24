# UNIT-745 — Verify: App emits interact and transition from game actions unit tests

## Summary
Unit tests prove App forwards actions to reactToPhaser

## Description
Add an App test using the existing fake Phaser host pattern from appObjectClick.test.tsx and a spy on reactToPhaser.emit.

## How to verify
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/tests/appGameActionEvents.test.tsx` · `new: App game action events` · new
- **Do:** Create the file copying the mocks and setup of appObjectClick.test.tsx (L1-L50), mock ../src/api/client getCurrentRound to resolve a round, spy on reactToPhaser.emit. Test 'action emits playAnimation': click Begin, emit phaserToReact objectClick for 'bed', click the first ActionMenu action button and assert the spy was called with 'playAnimation', {target:'boy',name:'interact'}.
- **Run:** `npx vitest run tests/appGameActionEvents.test.tsx -t playAnimation`
- **Expected:** playAnimation test passes

### Step 2 — `game/frontend/tests/appGameActionEvents.test.tsx` · `transition tests` · new
- **Do:** Add test 'scene change emits transitionTo': before clicking the action, make the action change state.sceneId by setting useGameStore.setState in a mocked act path (spy useGame act via vi.mock of ../src/runtime/useGame returning state.sceneId 'bedroom' then store sceneId 'library'); assert emit called with 'transitionTo', {sceneId:'library'}. Add test 'unchanged scene emits no transitionTo' asserting no transitionTo call.
- **Run:** `npx vitest run tests/appGameActionEvents.test.tsx`
- **Expected:** All tests pass

## Acceptance criteria
- Choosing an action emits playAnimation boy interact
- A scene id change emits transitionTo and no change does not

## Definition of done
- New tests pass
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-745.md`

## Links
- Evidence: EVD-150
- Requirement: REQ-372
- Unit (Act): UNIT-743
- Unit (Verify): UNIT-745
- Status: approved
- Change: UPDATE
