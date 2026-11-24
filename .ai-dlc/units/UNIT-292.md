# UNIT-292 — Act: Add zustand and create useUiStore with drawer and modal state

## Summary
Create store file with drawer and modal state and actions.

## Description
Add zustand to package.json dependencies and create src/store/uiStore.ts exporting useUiStore with drawerOpen, activeModal and their actions.

## How to act
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/package.json` · `dependencies` · L11-L22
- **Do:** Add the dependency "zustand": "^4.5.0" to the dependencies object, then run npm install in game/frontend.

```
"zustand": "^4.5.0"
```

- **Expected:** zustand resolves from node_modules

### Step 2 — `game/frontend/src/store/uiStore.ts` · `new: useUiStore` · new
- **Do:** Create the file exporting type UiModal = 'contribution' | 'settings', interface UiState and useUiStore with drawerOpen=false, activeModal=null, toggleDrawer, setDrawerOpen(open), openModal(modal), closeModal().

```
import { create } from 'zustand';
export type UiModal = 'contribution' | 'settings';
export interface UiState {
  drawerOpen: boolean;
  activeModal: UiModal | null;
  toggleDrawer: () => void;
  setDrawerOpen: (open: boolean) => void;
  openModal: (modal: UiModal) => void;
  closeModal: () => void;
}
export const useUiStore = create<UiState>((set) => ({
  drawerOpen: false,
  activeModal: null,
  toggleDrawer: () => set((s) => ({ drawerOpen: !s.drawerOpen })),
  setDrawerOpen: (open) => set({ drawerOpen: open }),
  openModal: (modal) => set({ activeModal: modal }),
  closeModal: () => set({ activeModal: null }),
}));
```

- **Expected:** npx tsc --noEmit passes

## Acceptance criteria
- Given the file, When imported, Then useUiStore is exported
- Given toggleDrawer, When called, Then drawerOpen flips

## Definition of done
- Store compiles with tsc --noEmit
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-292.md`

## Scan baseline
- Scan version: `v1`
- Scan tip: `9cda5131c65b08541fc685d8a0898d39a0e9e9fa`

## Links
- Evidence: EVD-058
- Requirement: REQ-146
- Unit (Act): UNIT-292
- Unit (Verify): UNIT-294
- Status: completed
- Change: UPDATE
