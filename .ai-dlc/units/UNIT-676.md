# UNIT-676 — Verify: History Retry via reload counter unit tests

## Summary
Unit tests for Retry behavior

## Description
Test Retry re-calls listMine and recovers.

## How to verify
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/tests/contributionHistoryRetry.test.tsx` · `new: describe('history retry')` · new
- **Do:** Create the file with the same client mock setup. Test 'Retry reloads and recovers': listMine mockRejectedValueOnce then mockResolvedValueOnce with one contribution; render open sheet, await alert, click button named Retry via userEvent, expect listMine toHaveBeenCalledTimes(2), the prompt visible, and no Retry button. Test 'no Retry when ready': listMine resolves, expect queryByRole('button',{name:'Retry'}) null.
- **Run:** `npx vitest run tests/contributionHistoryRetry.test.tsx`
- **Expected:** Both tests pass

## Acceptance criteria
- Retry calls listMine twice and ends ready
- No Retry outside error

## Definition of done
- Tests pass
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-676.md`

## Links
- Evidence: EVD-135
- Requirement: REQ-337
- Unit (Act): UNIT-673
- Unit (Verify): UNIT-676
- Status: completed
- Change: UPDATE
