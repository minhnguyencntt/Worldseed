# UNIT-327 — Verify: HeaderOverlay round info unit tests

## Summary
Unit tests for logo, world, round ID, status and countdown

## Description
Write unit tests from REQ1 for the ready state.

## How to verify
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/tests/headerOverlay.test.tsx` · `new: HeaderOverlay round info` · new
- **Do:** Create describe 'HeaderOverlay round info'. Test 'shows logo, world, round id, status and timer': render <HeaderOverlay worldTitle="The Boy's Room" round={roundFixture} /> with roundFixture imported from './fixtures/api' (mirrors the Round type in game/frontend/src/api/client.ts and the GET /api/v1/worlds/{id}/round/current response); assert getByText('StoryForge'), the world title, roundFixture.id, roundFixture.status and getByRole('timer').
- **Run:** `cd game/frontend && npx vitest run tests/headerOverlay.test.tsx -t "round info"`
- **Expected:** Test passes

## Acceptance criteria
- Ready state text and timer asserted
- The round info test passes when run alone

## Definition of done
- Tests green
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-327.md`

## Links
- Evidence: EVD-065
- Requirement: REQ-162
- Unit (Act): UNIT-324
- Unit (Verify): UNIT-327
- Status: completed
- Change: UPDATE
