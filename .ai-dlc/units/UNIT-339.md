# UNIT-339 — Verify: GameLayout header slot unit tests

## Summary
Unit tests for the GameLayout header slot.

## Description
Test that the header prop renders inside main and that omission leaves layout unchanged.

## How to verify
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/tests/layoutHeaderSlot.test.tsx` · `new: describe('GameLayout header slot')` · new
- **Do:** Create the file with // @vitest-environment jsdom, import GameLayout and render with header={<div data-testid="hdr"/>}, scene and story stubs; assert screen.getByTestId('hdr') is within container.querySelector('main') and not within container.querySelector('aside'). Add a second test rendering without header asserting scene-node and story-node present and no 'hdr'.
- **Run:** `cd game/frontend && npx vitest run tests/layoutHeaderSlot.test.tsx`
- **Expected:** Both tests pass.

## Acceptance criteria
- Header inside main
- No header renders scene and story

## Definition of done
- Tests pass
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-339.md`

## Links
- Evidence: EVD-067
- Requirement: REQ-168
- Unit (Act): UNIT-336
- Unit (Verify): UNIT-339
- Status: completed
- Change: NEW
