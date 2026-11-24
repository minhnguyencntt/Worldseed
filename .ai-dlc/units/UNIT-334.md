# UNIT-334 — Verify: App header round states unit tests

## Summary
Tests for loaded, loading and error header states.

## Description
Mock api client and assert header states.

## How to verify
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/tests/appHeader.test.tsx` · `new: describe('App header round states')` · new
- **Do:** Create jsdom test file; mock ../src/api/client getCurrentRound with a Round-typed object built per the Round interface (fixture constant in the file). Render App, click Begin. Tests: (1) resolved -> await findByText of round id and status; (2) never-resolving promise -> getByText('Loading round…'); (3) rejects Error('boom') -> findByRole('alert') has text 'Round unavailable: boom'; (4) world title "The Boy's Room" shown in header.
- **Run:** `cd game/frontend && npx vitest run tests/appHeader.test.tsx`
- **Expected:** All four tests pass.

## Acceptance criteria
- Loaded, loading and error states asserted.
- World title shown in the header is asserted.

## Definition of done
- Tests pass
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-334.md`

## Links
- Evidence: EVD-066
- Requirement: REQ-166
- Unit (Act): UNIT-331
- Unit (Verify): UNIT-334
- Status: completed
- Change: NEW
