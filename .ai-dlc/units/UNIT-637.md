# UNIT-637 — Verify: Zero-quota gating unit tests

## Summary
Unit tests for quota blocking

## Description
Prove submit is blocked at 0 remaining and allowed at 1 remaining, using a mocked history response.

## How to verify
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/tests/contributionValidation.test.tsx` · `test: zero quota blocks` · after boundary test
- **Do:** Stub fetch so the listMine route returns 5 contributions derived from contributionFixture with distinct prompts; render with roundId 'ROUND-1'; await findByText('No contributions left this round'); assert Send and textarea are disabled and no POST was made.
- **Run:** `cd game/frontend && npx vitest run tests/contributionValidation.test.tsx -t 'zero quota'`
- **Expected:** Message shown, controls disabled, no POST

### Step 2 — `game/frontend/tests/contributionValidation.test.tsx` · `test: one left allows send` · after zero quota test
- **Do:** Stub listMine with 4 contributions; type 'idea' and assert Send is enabled and queryByText('No contributions left this round') is null.
- **Run:** `cd game/frontend && npx vitest run tests/contributionValidation.test.tsx -t 'one left'`
- **Expected:** Send enabled, no quota message

## Acceptance criteria
- 5 sent entries disable Send and show the message
- 4 sent entries keep Send enabled

## Definition of done
- Tests pass
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-637.md`

## Links
- Evidence: EVD-127
- Requirement: REQ-318
- Unit (Act): UNIT-634
- Unit (Verify): UNIT-637
- Status: approved
- Change: UPDATE
