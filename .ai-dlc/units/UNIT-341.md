# UNIT-341 — Verify: No standalone RoundBadge or Countdown in App unit tests

## Summary
Unit tests proving the old badge and countdown are gone from App.

## Description
Assert a single timer inside the header and no App.tsx references to the removed components.

## How to verify
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/tests/appNoLegacyHeader.test.tsx` · `new: describe('App legacy header removal')` · new
- **Do:** Create the file with // @vitest-environment jsdom; vi.mock('../src/api/client') with getCurrentRound resolving roundFixture (from tests/fixtures/api.ts, mirroring the Round type in src/api/client.ts). Test 1: render App, click Begin, await findByText(roundFixture.id), assert screen.getAllByRole('timer') has length 1 and that it is within screen.getByRole('banner'). Test 2: read src/App.tsx with readFileSync and assert it does not match /RoundBadge|Countdown/.
- **Run:** `cd game/frontend && npx vitest run tests/appNoLegacyHeader.test.tsx`
- **Expected:** Both tests pass.

## Acceptance criteria
- One timer exists
- App.tsx lacks RoundBadge and Countdown

## Definition of done
- Tests pass
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-341.md`

## Links
- Evidence: EVD-067
- Requirement: REQ-170
- Unit (Act): UNIT-338
- Unit (Verify): UNIT-341
- Status: completed
- Change: NEW
