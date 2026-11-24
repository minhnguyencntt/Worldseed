# UNIT-631 — Verify: Focus returns to the trigger unit tests

## Summary
Test focus restoration in App

## Description
Unit tests that App returns focus to the trigger after Escape and Close.

## How to verify
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/tests/appContributionFocus.test.tsx` · `new: describe('App contribution focus')` · new
- **Do:** jsdom header; vi.mock the client with getCurrentRound resolving roundFixture and listMine resolving []. Render <App/>, click Begin, get the trigger by role button name 'Suggest What Happens Next', call trigger.focus() and click it. Test A: fireEvent.keyDown(getByRole('dialog'),{key:'Escape'}) then waitFor document.activeElement toBe trigger. Test B: click the Close button then waitFor the same assertion.
- **Run:** `cd game/frontend && npx vitest run tests/appContributionFocus.test.tsx`
- **Expected:** 2 tests pass

## Acceptance criteria
- Given the sheet was opened from the trigger, when Escape is pressed, then the trigger has focus
- Given the sheet was opened from the trigger, when Close is clicked, then the trigger has focus

## Definition of done
- Test file passes
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-631.md`

## Links
- Evidence: EVD-126
- Requirement: REQ-315
- Unit (Act): UNIT-628
- Unit (Verify): UNIT-631
- Status: completed
- Change: UPDATE
