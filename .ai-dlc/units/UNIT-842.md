# UNIT-842 — Verify: Suggest button opens the contribution dialog unit tests

## Summary
Unit tests cover the header button callback and the App dialog opening.

## Description
Component test for HeaderOverlay plus App test with api client and Phaser mocked.

## How to verify
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/tests/headerSuggest.test.tsx` · `new: describe('HeaderOverlay suggest button')` · new
- **Do:** Create test 'clicking the suggest button calls onSuggest once': render <HeaderOverlay worldTitle="W" round={roundFixture} onSuggest={fn} /> with fn = vi.fn(); fireEvent.click(getByRole('button',{name:'Suggest What Happens Next'})); expect fn toHaveBeenCalledTimes(1); expect button text content '+ SUGGEST WHAT HAPPENS NEXT' and class sf-btn-gold. roundFixture from tests/fixtures/api.ts (mirrors backend Round JSON).
- **Run:** `cd game/frontend && npx vitest run tests/headerSuggest.test.tsx`
- **Expected:** Test passes.

### Step 2 — `game/frontend/tests/appHeaderSuggest.test.tsx` · `new: describe('App header suggest button')` · new
- **Do:** Copy the mocks from tests/appContributionFocus.test.tsx L1-L38. Add test: render App, click Begin, await getCurrentRound, expect getAllByRole('button',{name:'Suggest What Happens Next'}) length 1 and it is inside getByRole('banner'); click it; expect getByRole('dialog') toBeInTheDocument(). Add test: press Escape (fireEvent.keyDown on dialog, key Escape) and waitFor document.activeElement equals the button.
- **Run:** `cd game/frontend && npx vitest run tests/appHeaderSuggest.test.tsx tests/appContributionFocus.test.tsx`
- **Expected:** New and existing focus tests pass.

## Acceptance criteria
- onSuggest called once on click.
- App opens the dialog from the header button and renders exactly one such button.
- Focus returns to the header button on Escape.

## Definition of done
- Tests pass
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-842.md`

## Links
- Evidence: EVD-169
- Requirement: REQ-420
- Unit (Act): UNIT-839
- Unit (Verify): UNIT-842
- Status: completed
- Change: UPDATE
