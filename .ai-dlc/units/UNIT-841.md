# UNIT-841 — Verify: Header bar, plaque, pill with dot and countdown unit tests

## Summary
Unit tests assert the header structure for a loaded round.

## Description
New test file proving REQ1 acceptance criteria with the real uiStore and the roundFixture.

## How to verify
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/tests/headerKit.test.tsx` · `new: describe('HeaderOverlay kit structure')` · new
- **Do:** Create the file importing render, screen, cleanup from @testing-library/react, HeaderOverlay and roundFixture from ./fixtures/api (a Round mirroring the backend round JSON in backend round handlers). Add test 'pill holds dot, id and status': render <HeaderOverlay worldTitle="The Boy's Room" round={roundFixture} />; assert getByTestId('round-pill') contains text round-1 and OPEN; assert getByTestId('round-dot') has attribute data-status=OPEN. Add test 'plaque and logo': assert getByText("The Boy's Room").closest('[data-frame="plaque"]') is not null, getByText('StoryForge') present, getByTestId('header-bar') has class sf-brass-corners, getAllByRole('timer') length 1.
- **Run:** `cd game/frontend && npx vitest run tests/headerKit.test.tsx`
- **Expected:** Both tests pass.

### Step 2 — `game/frontend/tests/headerOverlay.test.tsx` · `HeaderOverlay round info` · L1-L25
- **Do:** Run the existing suite unchanged to confirm text queries for StoryForge, world title, round id, status and timer still match.
- **Run:** `cd game/frontend && npx vitest run tests/headerOverlay.test.tsx`
- **Expected:** Existing test passes.

## Acceptance criteria
- Pill, dot, plaque and timer assertions pass.
- Existing headerOverlay.test.tsx still passes.

## Definition of done
- Tests pass
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-841.md`

## Links
- Evidence: EVD-169
- Requirement: REQ-419
- Unit (Act): UNIT-838
- Unit (Verify): UNIT-841
- Status: completed
- Change: UPDATE
