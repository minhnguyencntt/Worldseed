# UNIT-313 — Verify: Tests import the actual store and never mock it

## Summary
Guard tests prove the real module is used

## Description
Add guard tests to game/frontend/tests/uiStoreRealGuard.test.ts asserting no mock functions, the module exports useUiStore, and no vi.mock appears in the store test sources.

## How to verify
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/tests/uiStoreRealGuard.test.ts` · `new: it('store is not a mock')` · new
- **Do:** Create the file importing * as mod from '../src/store/uiStore' and { vi, describe, it, expect } from 'vitest'. Assert Object.keys(mod) contains 'useUiStore', vi.isMockFunction(mod.useUiStore) is false, and vi.isMockFunction is false for toggleDrawer, openModal, closeModal, toggleSound and toggleSettings on getState().
- **Run:** `cd game/frontend && npx vitest run tests/uiStoreRealGuard.test.ts -t 'not a mock'`
- **Expected:** The guard test passes.

### Step 2 — `game/frontend/tests/uiStoreRealGuard.test.ts` · `new: it('no vi.mock in store tests')` · new
- **Do:** Read uiStoreReal.test.ts, uiStoreDrawerModal.test.ts, uiStoreSoundSettings.test.ts and uiStoreHook.test.tsx with readFileSync from the same directory (fileURLToPath of import.meta.url) and assert none matches /vi\.mock\(/ while each contains "../src/store/uiStore".
- **Run:** `cd game/frontend && npx vitest run tests/uiStoreRealGuard.test.ts`
- **Expected:** All guard tests pass.

## Acceptance criteria
- Given the imports, when vi.isMockFunction is called on useUiStore and its actions, then false.
- Given the namespace import, when keys are read, then useUiStore is present.
- Given store test sources read from disk, when searched for vi.mock, then none found.

## Definition of done
- Guard test file passes
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-313.md`

## Links
- Evidence: EVD-062
- Requirement: REQ-156
- Unit (Act): UNIT-311
- Unit (Verify): UNIT-313
- Status: completed
- Change: UPDATE
