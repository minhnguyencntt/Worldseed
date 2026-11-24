# UNIT-721 — Verify: shutdown removes focus unit tests

## Summary
Phaser-mocked test that SHUTDOWN blurs objects and nulls the store focus

## Description
Run create with fake objects, trigger the captured shutdown handler, assert cleanup.

## How to verify
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/tests/bootSceneFocusShutdown.test.ts` · `new: BootScene shutdown focus removal` · new
- **Do:** Copy the mock setup from bootSceneKeyboard.test.ts with two fakes having blur: vi.fn(), focus: vi.fn(), isFocused false. Set useGameStore.setState({ focusedObjectId: 'bed' }), call boot.create(), take the 'shutdown' callback from events.once.mock.calls and invoke it. Assert each fake blur was called, useGameStore.getState().focusedObjectId is null, then clear mocks, call setState({ focusedObjectId: 'bed' }) and assert focus was not called again.
- **Run:** `cd game/frontend && npx vitest run tests/bootSceneFocusShutdown.test.ts`
- **Expected:** All three assertions pass.

## Acceptance criteria
- Blur is called on every object
- Store focus id becomes null
- No focus calls after shutdown

## Definition of done
- Tests pass
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-721.md`

## Links
- Evidence: EVD-144
- Requirement: REQ-360
- Unit (Act): UNIT-718
- Unit (Verify): UNIT-721
- Status: approved
- Change: UPDATE
