# UNIT-311 — Act: Confirm uiStore is a named export of a real zustand store

## Summary
Read-only confirmation that useUiStore is a named export from uiStore.ts

## Description
The guard tests import useUiStore by name from ../src/store/uiStore. This unit confirms that export and that nothing in the repo mocks it.

## How to act
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/src/store/uiStore.ts` · `useUiStore` · L16
- **Do:** Confirm line 16 reads 'export const useUiStore = create<UiState>()((set) => ({'; make no edit when it does.
- **Run:** `cd game/frontend && npx tsc --noEmit`
- **Expected:** Type-check passes and the export is present.

## Acceptance criteria
- Given uiStore.ts, when read, then useUiStore is exported with export const.
- Given src, when searched, then no mock replaces uiStore.

## Definition of done
- Export confirmed; no behavioral change
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-311.md`

## Scan baseline
- Scan version: `v1`
- Scan tip: `9cda5131c65b08541fc685d8a0898d39a0e9e9fa`

## Links
- Evidence: EVD-062
- Requirement: REQ-156
- Unit (Act): UNIT-311
- Unit (Verify): UNIT-313
- Status: completed
- Change: UPDATE
