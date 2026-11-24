# UNIT-877 — Verify: IntroScreen backdrop and centered dialog unit tests

## Summary
Render IntroScreen and assert backdrop, dialog frame and Begin callback.

## Description
Write tests/introScreen.test.tsx covering R2 acceptance criteria with RTL.

## How to verify
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/tests/introScreen.test.tsx` · `new: IntroScreen styled` · new
- **Do:** Add test that renders <IntroScreen onBegin={fn}/>; expects container.querySelector('section') toHaveClass('sf-fullscreen-bg'), a .sf-frame-parchment.sf-dialog element containing the text 'You decide.', then clicks getByRole('button',{name:'Begin'}) and expects fn toHaveBeenCalledTimes(1).
- **Run:** `cd game/frontend && npx vitest run tests/introScreen.test.tsx`
- **Expected:** The test passes.

## Acceptance criteria
- Root has sf-fullscreen-bg and a parchment dialog
- Begin click calls onBegin once

## Definition of done
- Test passes
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-877.md`

## Links
- Evidence: EVD-174
- Requirement: REQ-437
- Unit (Act): UNIT-873
- Unit (Verify): UNIT-877
- Status: approved
- Change: UPDATE
