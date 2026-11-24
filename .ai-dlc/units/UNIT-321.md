# UNIT-321 — Verify: HeaderOverlay unit tests

## Summary
Unit tests for HeaderOverlay states and store toggles

## Description
Add tests/headerOverlay.test.tsx proving the header renders each state and toggles the real store.

## How to verify
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/tests/headerOverlay.test.tsx` · `new: describe HeaderOverlay` · new
- **Do:** Create jsdom test file with jest-dom import; beforeEach reset useUiStore.setState({soundEnabled:true,settingsOpen:false}). Test 'ready': render HeaderOverlay worldTitle "The Boy's Room" round roundFixture; assert getByText('StoryForge'), getByText("The Boy's Room"), getByText('round-1'), getByText('OPEN'), getByRole('timer'). Test 'loading': loading true; assert getByText('Loading round…') and queryByRole('timer') null. Test 'error': error 'Could not load round (HTTP 500)'; assert getByRole('alert') has that text and queryByText('Round unavailable') null.
- **Run:** `npx vitest run tests/headerOverlay.test.tsx -t "ready|loading|error"`
- **Expected:** Three state tests pass

### Step 2 — `game/frontend/tests/headerOverlay.test.tsx` · `it: toggles store` · after the state tests
- **Do:** Click getByRole('button',{name:'Sound'}); assert useUiStore.getState().soundEnabled false and aria-pressed 'false'. Click getByRole('button',{name:'Settings'}); assert settingsOpen true.
- **Run:** `npx vitest run tests/headerOverlay.test.tsx`
- **Expected:** All HeaderOverlay tests pass

## Acceptance criteria
- Ready, loading and error states asserted
- Sound and Settings clicks flip store flags

## Definition of done
- Tests pass
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-321.md`

## Links
- Evidence: EVD-064
- Requirement: REQ-159
- Unit (Act): UNIT-318
- Unit (Verify): UNIT-321
- Status: completed
- Change: UPDATE
