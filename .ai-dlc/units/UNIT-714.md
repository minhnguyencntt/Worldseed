# UNIT-714 — Verify: BootScene keyboard unit tests for each key with Phaser mocked

## Summary
Mocked tests for Tab, arrows, Enter, Space, Escape and cleanup

## Description
New test file with Phaser mocked so Scene exposes input.keyboard {on, off} spies and events.once; buildScene mocked to return fake objects.

## How to verify
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/tests/bootSceneKeyboard.test.ts` · `new: describe('BootScene keyboard')` · new
- **Do:** Copy the vi.mock blocks from bootSceneSync.test.ts, extending the mocked Scene with input = { keyboard: { on: vi.fn(), off: vi.fn() } } and mocking buildScene returning one fake object {sync,destroy,onInteract,handleKey:vi.fn(),isFocused:true,spec:{id:'bookshelf'}} and moveFocus as vi.fn. In beforeEach create BootScene and call create(); grab the keydown handler from input.keyboard.on.mock.calls.

```
const press = (key: string, shiftKey = false) => handler({ key, shiftKey, preventDefault: vi.fn() } as unknown as KeyboardEvent);
```

- **Run:** `cd game/frontend && npx vitest run tests/bootSceneKeyboard.test.ts`
- **Expected:** Setup yields a callable handler.

### Step 2 — `game/frontend/tests/bootSceneKeyboard.test.ts` · `it blocks` · new
- **Do:** Add tests: Tab -> moveFocus called with (objects, 1) and focusChange emitted {id:'bookshelf'}; Shift+Tab and ArrowLeft -> -1; ArrowRight -> 1; Enter and ' ' -> fake.handleKey called with the key; Escape -> menuClose emitted via a phaserToReact.on spy; running the SHUTDOWN callback from events.once calls input.keyboard.off('keydown', handler).
- **Run:** `cd game/frontend && npx vitest run tests/bootSceneKeyboard.test.ts`
- **Expected:** All key tests pass.

## Acceptance criteria
- Tab, Shift+Tab, ArrowRight, ArrowLeft, Enter, Space and Escape each have a test.
- Shutdown removes the listener.

## Definition of done
- Tests pass
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-714.md`

## Links
- Evidence: EVD-143
- Requirement: REQ-356
- Unit (Act): UNIT-711
- Unit (Verify): UNIT-714
- Status: completed
- Change: UPDATE
