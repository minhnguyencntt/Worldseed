# UNIT-675 — Verify: History loading, ready and error status unit tests

## Summary
Unit tests for the HistoryStatus rendering

## Description
Test loading, ready and error rendering with listMine mocked.

## How to verify
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/tests/contributionHistoryStatus.test.tsx` · `new: describe('history status')` · new
- **Do:** Create the file mocking ../src/api/client (keep ApiError, MAX_PER_PLAYER, MAX_PROMPT_LENGTH real via importOriginal, mock listMine and submitContribution), mirroring the setup in tests/contributionLoadingLabel.test.tsx. Add test 'shows loading while listMine is pending' (never-resolving promise, expect text 'Loading your suggestions…'), 'hides loading and lists entries on success' (listMine resolves one contribution, expect prompt text and no loading text), and 'shows error alert when listMine rejects' (expect role alert 'Could not load your suggestions'). Contribution shape comes from the Contribution interface in src/api/client.ts.
- **Run:** `npx vitest run tests/contributionHistoryStatus.test.tsx`
- **Expected:** Three tests pass

## Acceptance criteria
- Loading shown while pending
- Error alert on rejection

## Definition of done
- Tests pass
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-675.md`

## Links
- Evidence: EVD-135
- Requirement: REQ-336
- Unit (Act): UNIT-672
- Unit (Verify): UNIT-675
- Status: completed
- Change: UPDATE
