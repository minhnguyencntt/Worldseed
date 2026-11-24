# UNIT-306 — Act: Finalize named exports of useUiStore, UiState and ModalId

## Summary
Ensure typed named exports

## Description
Confirm uiStore.ts exports useUiStore, UiState and ModalId as named exports so components can import them. Add no default export.

## How to act
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/src/store/uiStore.ts` · `export declarations of ModalId, UiState, useUiStore` · L1-end
- **Do:** Check that ModalId and UiState are declared with the export keyword and useUiStore is declared as export const. Remove any default export if present. Do not change any other code.

```
export type ModalId = 'contribution';
export interface UiState { /* members as above */ }
export const useUiStore = create<UiState>()(...)
```

- **Expected:** The three names are importable by name from src/store/uiStore

## Acceptance criteria
- Given the module, when imported by name, then useUiStore, UiState and ModalId resolve
- Given tsc --noEmit, when run, then it passes

## Definition of done
- Exports resolve and tsc passes
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-306.md`

## Scan baseline
- Scan version: `v1`
- Scan tip: `9cda5131c65b08541fc685d8a0898d39a0e9e9fa`

## Links
- Evidence: EVD-061
- Requirement: REQ-154
- Unit (Act): UNIT-306
- Unit (Verify): UNIT-309
- Status: completed
- Change: NEW
