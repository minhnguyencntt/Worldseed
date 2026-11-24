# UNIT-285 — Verify: HeaderOverlay and App shell unit tests with mocked API

## Summary
Unit tests for header content, store bindings and App composition

## Description
Test HeaderOverlay directly and App with the API client mocked.

## How to verify
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/tests/header.test.tsx` · `new: describe('HeaderOverlay')` · new
- **Do:** Mock motion/react (motion.header -> header). Render with a Round from tests/fixtures/api.ts (shape of Round in src/api/client.ts) and worldName 'The Boy\'s Room'; assert text StoryForge, world name, round id and status visible
- **Run:** `npx vitest run tests/header.test.tsx -t 'shows round info'`
- **Expected:** test passes

### Step 2 — `game/frontend/tests/header.test.tsx` · `it('sound and settings buttons update the store; error shown')` · new
- **Do:** Click 'Toggle sound' and assert aria-pressed flips and useUiStore soundEnabled false; click 'Settings' and assert settingsOpen true; render with round undefined and error 'Network down' and assert role alert contains 'Network down'
- **Run:** `npx vitest run tests/header.test.tsx -t 'sound and settings'`
- **Expected:** test passes

### Step 3 — `game/frontend/tests/app.test.tsx` · `new it('after Begin the header is present and Suggest opens the sheet via the store')` · after existing tests
- **Do:** With getCurrentRound mocked to resolve the fixture round, render App, click Begin, assert StoryForge text visible, click 'Suggest What Happens Next' and assert useUiStore.getState().modal === 'contribution'; reset store in afterEach
- **Run:** `npx vitest run tests/app.test.tsx -t 'header is present'`
- **Expected:** test passes and existing app tests still pass

## Acceptance criteria
- Header content, sound, settings and error states asserted
- App composition asserted

## Definition of done
- Tests pass
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-285.md`

## Links
- Evidence: EVD-056
- Requirement: REQ-142
- Unit (Act): UNIT-281
- Unit (Verify): UNIT-285
- Status: completed
- Change: UPDATE
