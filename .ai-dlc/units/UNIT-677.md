# UNIT-677 — Verify: History effect ignores settles after cancellation unit tests

## Summary
Unit tests for the cancel guard

## Description
Test that late resolve/reject after close or round change write nothing.

## How to verify
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/tests/contributionHistoryCancel.test.tsx` · `new: describe('history cancel guard')` · new
- **Do:** Create the file with the client mock. Test 'late reject after close is ignored': first listMine returns a deferred promise, render open then rerender open=false, reject the deferred, then rerender open=true with a second listMine resolving [], expect no 'Could not load your suggestions' alert. Test 'late resolve after roundId change is ignored': deferred for round 'r1' rerendered with roundId 'r2' resolving [], then resolve r1 with a contribution, expect its prompt not in the list. Test 'unmount does not warn': spy on console.error, unmount, settle, expect not called.
- **Run:** `npx vitest run tests/contributionHistoryCancel.test.tsx`
- **Expected:** Three tests pass

## Acceptance criteria
- Late reject after close shows no error
- Late resolve after roundId change adds no entries

## Definition of done
- Tests pass
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-677.md`

## Links
- Evidence: EVD-135
- Requirement: REQ-338
- Unit (Act): UNIT-674
- Unit (Verify): UNIT-677
- Status: completed
- Change: UPDATE
