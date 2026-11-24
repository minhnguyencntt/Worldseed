# UNIT-300 — Act: Finalize named exports of useUiStore, UiState and ModalId

## Summary
Ensure uiStore.ts exports the typed hook and types as named exports.

## Description
Confirm uiStore.ts exports UiState, ModalId and useUiStore by name so selector usage is typed.

## How to act
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/src/store/uiStore.ts` · `ModalId, UiState, useUiStore` · L1-end
- **Do:** Verify ModalId, UiState and useUiStore each carry the export keyword and add the export keyword to any that lack it; add no default export.
- **Expected:** import { useUiStore, type UiState, type ModalId } from '../src/store/uiStore' type-checks

## Acceptance criteria
- All three names are exported
- Selector usage type-checks

## Definition of done
- Exports verified
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-300.md`

## Scan baseline
- Scan version: `v1`
- Scan tip: `9cda5131c65b08541fc685d8a0898d39a0e9e9fa`

## Links
- Evidence: EVD-060
- Requirement: REQ-151
- Unit (Act): UNIT-300
- Unit (Verify): UNIT-303
- Status: completed
- Change: UPDATE
