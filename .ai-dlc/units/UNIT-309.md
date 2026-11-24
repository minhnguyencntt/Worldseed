# UNIT-309 — Verify: Typed useUiStore hook export unit tests

## Summary
Unit tests for the hook export and component usage

## Description
Test the named export and its use from a React component through a selector, using the real store.

## How to verify
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/tests/uiStoreHook.test.tsx` · `new: describe('useUiStore export')` · new
- **Do:** Import { useUiStore } from '../src/store/uiStore'. Test 'is a hook with getState and setState' asserting typeof checks. Test 'component re-renders': render a component <p>{useUiStore(s => s.soundEnabled) ? 'on' : 'off'}</p>, assert 'on', call act(() => useUiStore.getState().toggleSound()), assert 'off'. Reset state in beforeEach.
- **Run:** `npx vitest run tests/uiStoreHook.test.tsx`
- **Expected:** 2 tests pass

## Acceptance criteria
- Given the module, when imported, then useUiStore is a function exposing getState and setState
- Given a component using useUiStore(s => s.soundEnabled), when toggleSound is called inside act, then the rendered text updates

## Definition of done
- Tests pass
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-309.md`

## Links
- Evidence: EVD-061
- Requirement: REQ-154
- Unit (Act): UNIT-306
- Unit (Verify): UNIT-309
- Status: completed
- Change: NEW
