# UNIT-295 — Verify: Sound and settings store unit tests

## Summary
Unit tests for sound and settings flags.

## Description
Add tests to tests/uiStore.test.ts for sound and settings flags.

## How to verify
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/tests/uiStore.test.ts` · `new: describe('useUiStore sound and settings')` · after the drawer and modal describe block
- **Do:** Add describe block resetting state with useUiStore.setState({ soundEnabled: true, settingsOpen: false }). Tests: defaults true/false; toggleSound makes soundEnabled false; setSoundEnabled(true) restores true; toggleSettings makes settingsOpen true.
- **Run:** `cd game/frontend && npx vitest run tests/uiStore.test.ts -t "sound and settings"`
- **Expected:** Sound and settings tests pass

## Acceptance criteria
- Given a reset store, When read, Then soundEnabled is true and settingsOpen false
- Given a reset store, When toggleSound and toggleSettings run, Then soundEnabled false and settingsOpen true

## Definition of done
- Tests pass
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-295.md`

## Links
- Evidence: EVD-058
- Requirement: REQ-147
- Unit (Act): UNIT-293
- Unit (Verify): UNIT-295
- Status: completed
- Change: UPDATE
