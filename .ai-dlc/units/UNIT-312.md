# UNIT-312 — Verify: Real store defaults and each action unit tests

## Summary
Consolidated tests for defaults and all five actions of the real store

## Description
Write game/frontend/tests/uiStoreReal.test.ts importing the real store and asserting defaults, double toggles and modal open/close, with state reset in beforeEach.

## How to verify
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/tests/uiStoreReal.test.ts` · `new: describe('real uiStore defaults')` · new
- **Do:** Create the file importing { describe, it, expect, beforeEach } from 'vitest' and { useUiStore } from '../src/store/uiStore'; beforeEach calls useUiStore.setState(useUiStore.getInitialState(), true). Add test 'default state' asserting drawerOpen false, modal null, soundEnabled true, settingsOpen false and typeof toggleDrawer/openModal/closeModal/toggleSound/toggleSettings === 'function'.

```
it('default state', () => { const s = useUiStore.getState(); expect(s.drawerOpen).toBe(false); expect(s.modal).toBeNull(); expect(s.soundEnabled).toBe(true); expect(s.settingsOpen).toBe(false); expect(typeof s.toggleDrawer).toBe('function'); });
```

- **Run:** `cd game/frontend && npx vitest run tests/uiStoreReal.test.ts -t 'default state'`
- **Expected:** The default state test passes.

### Step 2 — `game/frontend/tests/uiStoreReal.test.ts` · `new: it('each toggle flips and restores')` · new
- **Do:** Add a test calling toggleDrawer, toggleSound and toggleSettings once each and asserting drawerOpen true, soundEnabled false, settingsOpen true; call each again and assert drawerOpen false, soundEnabled true, settingsOpen false; assert modal stays null throughout.
- **Run:** `cd game/frontend && npx vitest run tests/uiStoreReal.test.ts -t 'each toggle'`
- **Expected:** The toggle test passes.

### Step 3 — `game/frontend/tests/uiStoreReal.test.ts` · `new: it('openModal then closeModal')` · new
- **Do:** Add a test calling openModal('contribution') and asserting modal 'contribution' with drawerOpen still false, then closeModal() and asserting modal null.
- **Run:** `cd game/frontend && npx vitest run tests/uiStoreReal.test.ts`
- **Expected:** All tests in the file pass.

## Acceptance criteria
- Given reset state, when read, then defaults and five function actions are asserted.
- Given each toggle twice, when read, then flip then restore is asserted with other fields unchanged.
- Given openModal then closeModal, when read, then 'contribution' then null.

## Definition of done
- Test file passes via its own command
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-312.md`

## Links
- Evidence: EVD-062
- Requirement: REQ-155
- Unit (Act): UNIT-310
- Unit (Verify): UNIT-312
- Status: completed
- Change: UPDATE
