# UNIT-618 — Verify: HeaderOverlay Retry and success state unit tests

## Summary
Unit tests for the Retry button and loading, success, empty states

## Description
Tests render HeaderOverlay with fixtures only.

## How to verify
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/tests/headerRetry.test.tsx` · `new: HeaderOverlay retry` · new
- **Do:** Add tests: (1) render with error='Round service returned 500' and onRetry=vi.fn(); click button 'Retry'; assert called once. (2) render with roundFixture and no error; assert queryByRole('button',{name:'Retry'}) is null, the id text 'round-1', status 'OPEN' and role timer present.
- **Run:** `cd game/frontend && npx vitest run tests/headerRetry.test.tsx`
- **Expected:** Both tests pass

## Acceptance criteria
- Retry click calls onRetry
- No Retry without error
- Success state shows round id, status and timer

## Definition of done
- Tests pass
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-618.md`

## Links
- Evidence: EVD-124
- Requirement: REQ-308
- Unit (Act): UNIT-615
- Unit (Verify): UNIT-618
- Status: completed
- Change: UPDATE
