# UNIT-335 — Verify: No standalone RoundBadge or Countdown in App unit tests

## Summary
Tests assert single header round UI and source cleanliness.

## Description
Assert round status renders once within header and App source lacks the imports.

## How to verify
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/tests/appNoLegacyRound.test.tsx` · `new: describe('App legacy round UI removed')` · new
- **Do:** Create jsdom test. Mock getCurrentRound with a Round fixture status 'OPEN'. Render App, click Begin, await the header. Assert screen.getAllByText('OPEN') has length 1 and its closest('header') is non-null. Add a test that reads src/App.tsx with node:fs and expects it not to match /RoundBadge|Countdown/.
- **Run:** `cd game/frontend && npx vitest run tests/appNoLegacyRound.test.tsx`
- **Expected:** Both tests pass.

## Acceptance criteria
- Status appears once inside header.
- App.tsx source has no RoundBadge/Countdown.

## Definition of done
- Tests pass
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-335.md`

## Links
- Evidence: EVD-066
- Requirement: REQ-167
- Unit (Act): UNIT-332
- Unit (Verify): UNIT-335
- Status: completed
- Change: UPDATE
