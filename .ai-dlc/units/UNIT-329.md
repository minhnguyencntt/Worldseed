# UNIT-329 — Verify: HeaderOverlay loading, empty and error states unit tests

## Summary
Unit tests for the three non-ready states

## Description
Write unit tests from REQ3.

## How to verify
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/tests/headerOverlayStates.test.tsx` · `new: HeaderOverlay states` · new
- **Do:** Create describe 'HeaderOverlay states' with three tests: loading renders <HeaderOverlay worldTitle="W" loading /> and asserts getByText('Loading round…') and queryByRole('timer') null; error renders error="Round service returned 500" with roundFixture also passed and asserts getByRole('alert') has text 'Round unavailable: Round service returned 500' and no timer; empty renders only worldTitle and asserts getByText('No active round'). Import roundFixture from './fixtures/api' (mirrors Round in src/api/client.ts).
- **Run:** `cd game/frontend && npx vitest run tests/headerOverlayStates.test.tsx`
- **Expected:** All three tests pass

## Acceptance criteria
- Each state asserted
- All three state tests pass when run together

## Definition of done
- Tests green
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-329.md`

## Links
- Evidence: EVD-065
- Requirement: REQ-164
- Unit (Act): UNIT-326
- Unit (Verify): UNIT-329
- Status: completed
- Change: UPDATE
