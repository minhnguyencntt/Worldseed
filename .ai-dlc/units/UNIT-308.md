# UNIT-308 — Verify: Sound and settings store unit tests

## Summary
Unit tests for sound and settings toggles

## Description
Write unit tests against the real store for soundEnabled and settingsOpen.

## How to verify
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/tests/uiStoreSoundSettings.test.ts` · `new: describe('uiStore sound and settings')` · new
- **Do:** Import useUiStore from '../src/store/uiStore'. Reset in beforeEach with useUiStore.setState(useUiStore.getInitialState(), true). Test defaults soundEnabled true and settingsOpen false. Test toggleSound sets soundEnabled false and leaves settingsOpen false. Test toggleSettings sets settingsOpen true and leaves soundEnabled true.
- **Run:** `npx vitest run tests/uiStoreSoundSettings.test.ts`
- **Expected:** 3 tests pass

## Acceptance criteria
- Given a reset store, when read, then soundEnabled is true and settingsOpen is false
- Given a reset store, when toggleSound is called, then only soundEnabled flips, and toggleSettings flips only settingsOpen

## Definition of done
- Tests pass
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-308.md`

## Links
- Evidence: EVD-061
- Requirement: REQ-153
- Unit (Act): UNIT-305
- Unit (Verify): UNIT-308
- Status: completed
- Change: NEW
