# UNIT-304 — Act: Create uiStore.ts with drawer and modal state and actions

## Summary
New store file with drawer and modal

## Description
Create game/frontend/src/store/uiStore.ts with the Zustand store, drawerOpen, modal, toggleDrawer, openModal and closeModal.

## How to act
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/src/store/uiStore.ts` · `new: ModalId, UiState, useUiStore` · new
- **Do:** Create the file. Define type ModalId = 'contribution'; define interface UiState with drawerOpen: boolean, modal: ModalId | null, toggleDrawer(): void, openModal(id: ModalId): void, closeModal(): void. Export useUiStore = create<UiState>()((set) => ...) with initial drawerOpen false and modal null.

```
import { create } from 'zustand';
export type ModalId = 'contribution';
export interface UiState {
  drawerOpen: boolean;
  modal: ModalId | null;
  toggleDrawer: () => void;
  openModal: (id: ModalId) => void;
  closeModal: () => void;
}
export const useUiStore = create<UiState>()((set) => ({
  drawerOpen: false,
  modal: null,
  toggleDrawer: () => set((s) => ({ drawerOpen: !s.drawerOpen })),
  openModal: (id) => set({ modal: id }),
  closeModal: () => set({ modal: null }),
}));
```

- **Expected:** tsc --noEmit accepts the file and the store has the initial state drawerOpen false, modal null

## Acceptance criteria
- Given the file, when imported, then drawerOpen is false and modal is null
- Given the actions, when called, then state updates as specified

## Definition of done
- File exists and compiles
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-304.md`

## Scan baseline
- Scan version: `v1`
- Scan tip: `9cda5131c65b08541fc685d8a0898d39a0e9e9fa`

## Links
- Evidence: EVD-061
- Requirement: REQ-152
- Unit (Act): UNIT-304
- Unit (Verify): UNIT-307
- Status: completed
- Change: NEW
