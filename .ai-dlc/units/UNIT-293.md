# UNIT-293 — Act: Add sound and settings flags and actions to useUiStore

## Summary
Extend UiState with soundEnabled, settingsOpen and actions.

## Description
Extend src/store/uiStore.ts with soundEnabled (true), settingsOpen (false), toggleSound, setSoundEnabled and toggleSettings.

## How to act
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/src/store/uiStore.ts` · `UiState` · new
- **Do:** Add to interface UiState: soundEnabled: boolean; settingsOpen: boolean; toggleSound: () => void; setSoundEnabled: (on: boolean) => void; toggleSettings: () => void.

```
soundEnabled: boolean;
settingsOpen: boolean;
toggleSound: () => void;
setSoundEnabled: (on: boolean) => void;
toggleSettings: () => void;
```

- **Expected:** Interface declares the new members

### Step 2 — `game/frontend/src/store/uiStore.ts` · `useUiStore` · new
- **Do:** In the create initializer add soundEnabled: true, settingsOpen: false and the three actions.

```
soundEnabled: true,
settingsOpen: false,
toggleSound: () => set((s) => ({ soundEnabled: !s.soundEnabled })),
setSoundEnabled: (on) => set({ soundEnabled: on }),
toggleSettings: () => set((s) => ({ settingsOpen: !s.settingsOpen })),
```

- **Expected:** npx tsc --noEmit passes

## Acceptance criteria
- Given the store, When toggleSound is called, Then soundEnabled is false
- Given the store, When toggleSettings is called, Then settingsOpen is true

## Definition of done
- Store compiles with tsc --noEmit
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-293.md`

## Scan baseline
- Scan version: `v1`
- Scan tip: `9cda5131c65b08541fc685d8a0898d39a0e9e9fa`

## Links
- Evidence: EVD-058
- Requirement: REQ-147
- Unit (Act): UNIT-293
- Unit (Verify): UNIT-295
- Status: completed
- Change: UPDATE
