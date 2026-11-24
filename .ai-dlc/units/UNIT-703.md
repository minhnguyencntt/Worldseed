# UNIT-703 — Verify: objectClick event selects the object and unsubscribes on unmount

## Summary
Unit tests emit objectClick on the real bus with Phaser mocked.

## Description
Write tests/appObjectClick.test.tsx proving App reacts to objectClick and cleans its listener.

## How to verify
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/tests/appObjectClick.test.tsx` · `new: App objectClick bridge tests` · new
- **Do:** Create a test file with the same createGame/BootScene mocks and ResizeObserver stub as appPhaserHost.test.tsx; render <App/>, click Begin, wrap phaserToReact.emit('objectClick',{id:'bookshelf'}) in act(), and assert buttons named Inspect, Push, Search and Leave exist; add a second test that spies console.error, unmounts, emits again inside act, and asserts console.error was not called and no 'Inspect' button exists.
- **Run:** `cd game/frontend && npx vitest run tests/appObjectClick.test.tsx`
- **Expected:** Both tests pass.

### Step 2 — `game/frontend/tests/appObjectClick.test.tsx` · `run` · new
- **Do:** Run only this file.
- **Run:** `cd game/frontend && npx vitest run tests/appObjectClick.test.tsx`
- **Expected:** 2 tests pass.

## Acceptance criteria
- Given App is mounted after Begin, when objectClick with id bookshelf is emitted, then Inspect, Push, Search and Leave buttons show.
- Given App is unmounted, when objectClick is emitted, then no ActionMenu appears and no error is logged.

## Definition of done
- New test file passes
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-703.md`

## Links
- Evidence: EVD-141
- Requirement: REQ-351
- Unit (Act): UNIT-701
- Unit (Verify): UNIT-703
- Status: completed
- Change: UPDATE
