# UNIT-310 — Act: Confirm uiStore exposes every default field and action the suite asserts

## Summary
Read-only confirmation that uiStore.ts already has all defaults and actions

## Description
uiStore.ts already defines drawerOpen=false, modal=null, soundEnabled=true, settingsOpen=false and five actions. No product change is required; this unit confirms the surface so the tests can be written against it.

## How to act
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/src/store/uiStore.ts` · `useUiStore` · L16-L29
- **Do:** Confirm the create() initializer sets drawerOpen:false, modal:null, soundEnabled:true, settingsOpen:false and defines toggleDrawer, openModal, closeModal, toggleSound and toggleSettings; make no edit when all are present.
- **Run:** `cd game/frontend && npx tsc --noEmit`
- **Expected:** Type-check passes and the file is unchanged.

## Acceptance criteria
- Given uiStore.ts, when read, then all four fields and five actions exist with the stated defaults.
- Given the file, when type-checked, then it compiles unchanged.

## Definition of done
- uiStore.ts surface confirmed; no behavioral change
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-310.md`

## Scan baseline
- Scan version: `v1`
- Scan tip: `9cda5131c65b08541fc685d8a0898d39a0e9e9fa`

## Links
- Evidence: EVD-062
- Requirement: REQ-155
- Unit (Act): UNIT-310
- Unit (Verify): UNIT-312
- Status: completed
- Change: UPDATE
