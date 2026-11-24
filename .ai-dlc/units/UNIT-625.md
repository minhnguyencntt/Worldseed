# UNIT-625 — Verify: Contribution history loading, empty, error and list unit tests

## Summary
Unit tests for history states with fetch mocked

## Description
Test history rendering for success, pending, empty and failure.

## How to verify
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/tests/contributionHistory.test.tsx` · `test: history renders` · new
- **Do:** Create file with jsdom env. Stub GET /api/v1/player/me/contributions?round_id=round-1 to return [contributionFixture]. Render with roundId 'round-1'; assert 'Loading suggestions…' initially, then within list 'Your suggestions' find contributionFixture.prompt and 'Sent'.
- **Run:** `cd game/frontend && npx vitest run tests/contributionHistory.test.tsx -t "history renders"`
- **Expected:** Loading then history item with Sent

### Step 2 — `game/frontend/tests/contributionHistory.test.tsx` · `test: empty history` · new
- **Do:** Stub the GET to return []; assert 'No suggestions yet' appears.
- **Run:** `cd game/frontend && npx vitest run tests/contributionHistory.test.tsx -t "empty history"`
- **Expected:** Empty message shown

### Step 3 — `game/frontend/tests/contributionHistory.test.tsx` · `test: history failure` · new
- **Do:** Stub the GET to return status 500 and POST to return 201 contributionFixture; assert alert 'Could not load your suggestions'; then type text, click Send and assert the POST was made and 'Idea sent' shows.
- **Run:** `cd game/frontend && npx vitest run tests/contributionHistory.test.tsx -t "history failure"`
- **Expected:** Error shown and submit still works

## Acceptance criteria
- History prompts render marked Sent
- Loading and empty messages
- Load error alert and submit still works

## Definition of done
- New test file passes
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-625.md`

## Links
- Evidence: EVD-125
- Requirement: REQ-312
- Unit (Act): UNIT-622
- Unit (Verify): UNIT-625
- Status: approved
- Change: UPDATE
