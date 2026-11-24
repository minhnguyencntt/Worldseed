# UNIT-298 — Act: Create uiStore.ts with drawer and modal state and actions

## Summary
Create the store file with drawerOpen, modal, toggleDrawer, openModal, closeModal.

## Description
Create game/frontend/src/store/uiStore.ts using zustand create with the UiState type holding drawer and modal fields and actions.

## How to act
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/src/store/uiStore.ts` · `new: UiState, ModalId, useUiStore` · new
- **Do:** Create the file importing { create } from 'zustand'. Define ModalId = 'contribution'. Define UiState with drawerOpen: boolean, modal: ModalId | null, toggleDrawer, openModal(id), closeModal. Export useUiStore with initial drawerOpen false and modal null.

```
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

- **Expected:** File exists and tsc --noEmit passes

## Acceptance criteria
- uiStore.ts exists and exports useUiStore
- Drawer and modal actions behave per REQ1

## Definition of done
- File compiles
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-298.md`

## Scan baseline
- Scan version: `v1`
- Scan tip: `9cda5131c65b08541fc685d8a0898d39a0e9e9fa`

## Links
- Evidence: EVD-060
- Requirement: REQ-149
- Unit (Act): UNIT-298
- Unit (Verify): UNIT-301
- Status: completed
- Change: UPDATE
