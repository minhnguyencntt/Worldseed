# UNIT-279 — Act: Create the useUiStore Zustand store

## Summary
Implement uiStore with state and actions

## Description
Create the store module with typed state and actions.

## How to act
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/src/store/uiStore.ts` · `new: useUiStore, UiState, UiModal` · new
- **Do:** Define type UiModal = 'contribution' | 'settings' | null; interface UiState with drawerOpen, modal, soundEnabled, settingsOpen and actions toggleDrawer, setDrawerOpen(open), openModal(m), closeModal, toggleSound, setSettingsOpen(open); export useUiStore = create<UiState>() with initial drawerOpen false, modal null, soundEnabled true, settingsOpen false

```
export const useUiStore = create<UiState>()((set) => ({ drawerOpen: false, modal: null, soundEnabled: true, settingsOpen: false, toggleDrawer: () => set((s) => ({ drawerOpen: !s.drawerOpen })), setDrawerOpen: (drawerOpen) => set({ drawerOpen }), openModal: (modal) => set({ modal }), closeModal: () => set({ modal: null }), toggleSound: () => set((s) => ({ soundEnabled: !s.soundEnabled })), setSettingsOpen: (settingsOpen) => set({ settingsOpen }) }));
```

- **Expected:** tsc --noEmit passes with the new module

## Acceptance criteria
- useUiStore exports state and all actions
- initial values match the requirement

## Definition of done
- Store compiles under tsc
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-279.md`

## Scan baseline
- Scan version: `v1`
- Scan tip: `9cda5131c65b08541fc685d8a0898d39a0e9e9fa`

## Links
- Evidence: EVD-056
- Requirement: REQ-140
- Unit (Act): UNIT-279
- Unit (Verify): UNIT-283
- Status: completed
- Change: UPDATE
