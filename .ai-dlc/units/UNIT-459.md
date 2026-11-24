# UNIT-459 — Verify: untrackNodeModules force-removes the conflicted results.json

## Summary
Unit test with a fake git runner asserting the -f cached removal.

## Description
Update and add tests for the cleanup call arguments.

## How to verify
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/tests/trackedNodeModules.test.ts` · `describe('untrackNodeModules') > it('force-removes conflicted results.json')` · L46-L88
- **Do:** Add a test with run = vi.fn(); call untrackNodeModules(run); assert run toHaveBeenNthCalledWith(2, ['rm','--cached','-f','--ignore-unmatch','-q','--','node_modules/.vite/vitest/results.json']) and that every call includes '--cached'. Update any existing assertion that expects the old second-call args.
- **Run:** `npx vitest run tests/trackedNodeModules.test.ts -t untrackNodeModules`
- **Expected:** All untrackNodeModules tests pass.

## Acceptance criteria
- Runner receives the -f cached removal for results.json.
- Node_modules removal is first.

## Definition of done
- Tests pass
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-459.md`

## Links
- Evidence: EVD-092
- Requirement: REQ-229
- Unit (Act): UNIT-457
- Unit (Verify): UNIT-459
- Status: completed
- Change: UPDATE
