# UNIT-302 — Verify: Sound and settings store unit tests

## Summary
Unit tests for sound and settings flags.

## Description
Test sound and settings defaults and toggles including isolation between flags.

## How to verify
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/tests/uiStoreSoundSettings.test.ts` · `new: describe('uiStore sound and settings')` · new
- **Do:** Create tests: defaults soundEnabled true and settingsOpen false; toggleSound flips soundEnabled while settingsOpen, drawerOpen and modal stay unchanged; toggleSettings flips settingsOpen while soundEnabled stays unchanged.
- **Run:** `cd game/frontend && npx vitest run tests/uiStoreSoundSettings.test.ts`
- **Expected:** All tests pass

## Acceptance criteria
- Defaults asserted
- Toggles do not affect other state

## Definition of done
- Tests pass
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-302.md`

## Links
- Evidence: EVD-060
- Requirement: REQ-150
- Unit (Act): UNIT-299
- Unit (Verify): UNIT-302
- Status: completed
- Change: NEW
