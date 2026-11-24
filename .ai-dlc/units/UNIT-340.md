# UNIT-340 — Verify: App header round states unit tests

## Summary
Unit tests for loading, success and error header states in App with the API mocked.

## Description
Mock ../src/api/client getCurrentRound and assert header states after Begin.

## How to verify
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/tests/appHeader.test.tsx` · `new: describe('App header round states')` · new
- **Do:** Create the file with // @vitest-environment jsdom; vi.mock('../src/api/client') and set getCurrentRound with mockReturnValue(new Promise(() => {})) for loading, mockResolvedValue(roundFixture) for success, mockRejectedValue(new Error('boom')) for error. Render App, click the Begin button, then assert: 'Loading round…' text; findByText(roundFixture.id) and status; findByRole('alert') has text containing 'boom'. The roundFixture comes from tests/fixtures/api.ts, which mirrors the Round type in src/api/client.ts and the backend current-round handler response; do not inline the payload.
- **Run:** `cd game/frontend && npx vitest run tests/appHeader.test.tsx`
- **Expected:** Three tests pass.

## Acceptance criteria
- Loading shown
- Round id shown
- Error alert shown

## Definition of done
- Tests pass
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-340.md`

## Links
- Evidence: EVD-067
- Requirement: REQ-169
- Unit (Act): UNIT-337
- Unit (Verify): UNIT-340
- Status: completed
- Change: NEW
