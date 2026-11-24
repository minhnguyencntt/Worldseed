# UNIT-305 — Act: Add sound and settings flags and toggles to uiStore.ts

## Summary
Add soundEnabled and settingsOpen

## Description
Extend the UiState interface and the store created by ACT1 with soundEnabled, settingsOpen, toggleSound and toggleSettings.

## How to act
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/src/store/uiStore.ts` · `UiState and useUiStore` · after the closeModal member
- **Do:** Add soundEnabled: boolean and settingsOpen: boolean, toggleSound: () => void and toggleSettings: () => void to the UiState interface. Add the initial values soundEnabled: true and settingsOpen: false, and the two toggle actions to the create callback.

```
soundEnabled: true,
settingsOpen: false,
toggleSound: () => set((s) => ({ soundEnabled: !s.soundEnabled })),
toggleSettings: () => set((s) => ({ settingsOpen: !s.settingsOpen })),
```

- **Expected:** The store exposes soundEnabled true and settingsOpen false, and each toggle flips only its own flag

## Acceptance criteria
- Given the store, when read, then soundEnabled is true and settingsOpen is false
- Given the toggles, when called, then only their own flag flips

## Definition of done
- Flags and actions present
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-305.md`

## Scan baseline
- Scan version: `v1`
- Scan tip: `9cda5131c65b08541fc685d8a0898d39a0e9e9fa`

## Links
- Evidence: EVD-061
- Requirement: REQ-153
- Unit (Act): UNIT-305
- Unit (Verify): UNIT-308
- Status: completed
- Change: NEW
