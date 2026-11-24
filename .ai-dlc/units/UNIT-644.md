# UNIT-644 — Verify: Max-length counter unit tests

## Summary
Unit tests prove the counter text and constant

## Description
Write unit tests for the counter using the mocked API client, mirroring the setup in tests/contributionBlank.test.tsx.

## How to verify
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/tests/contributionMaxLength.test.tsx` · `new: ContributionSheet max length counter` · new
- **Do:** Create the file with the jsdom pragma and the vi.mock of submitContribution and listMine copied from tests/contributionBlank.test.tsx L1-L26; listMine resolves [contributionFixture] from tests/fixtures/api (mirrors the Contribution type in src/api/client.ts and backend contribution list handler response). Add tests: (1) initial render shows '0 / 500'; (2) fireEvent.change to 'hello' shows '5 / 500'; (3) value '  hi  ' shows '2 / 500'; (4) textarea getAttribute('aria-describedby') contains 'contribution-idea-count'; (5) MAX_PROMPT_LENGTH equals 500
- **Run:** `cd game/frontend && npx vitest run tests/contributionMaxLength.test.tsx -t counter`
- **Expected:** All counter tests pass

## Acceptance criteria
- Counter reads '0 / 500' initially
- Counter counts trimmed characters
- aria-describedby references the counter

## Definition of done
- Tests pass
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-644.md`

## Links
- Evidence: EVD-129
- Requirement: REQ-321
- Unit (Act): UNIT-642
- Unit (Verify): UNIT-644
- Status: completed
- Change: UPDATE
