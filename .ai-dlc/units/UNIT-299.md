# UNIT-299 — Act: Add sound and settings flags and toggles to uiStore.ts

## Summary
Extend UiState with soundEnabled, settingsOpen, toggleSound, toggleSettings.

## Description
Add sound and settings fields and actions to the store created in uiStore.ts.

## How to act
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/src/store/uiStore.ts` · `UiState and useUiStore initializer` · after the closeModal member
- **Do:** Add soundEnabled: boolean and settingsOpen: boolean plus toggleSound and toggleSettings to the UiState interface; add initial soundEnabled: true, settingsOpen: false and the two toggle actions to the create initializer.

```
soundEnabled: true,
settingsOpen: false,
toggleSound: () => set((s) => ({ soundEnabled: !s.soundEnabled })),
toggleSettings: () => set((s) => ({ settingsOpen: !s.settingsOpen })),
```

- **Expected:** Store exposes sound and settings state and actions

## Acceptance criteria
- soundEnabled defaults true, settingsOpen defaults false
- Toggles flip only their own flag

## Definition of done
- Fields and actions compile
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-299.md`

## Scan baseline
- Scan version: `v1`
- Scan tip: `9cda5131c65b08541fc685d8a0898d39a0e9e9fa`

## Links
- Evidence: EVD-060
- Requirement: REQ-150
- Unit (Act): UNIT-299
- Unit (Verify): UNIT-302
- Status: completed
- Change: UPDATE
