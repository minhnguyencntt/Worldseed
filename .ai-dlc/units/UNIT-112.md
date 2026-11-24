# UNIT-112 — Verify: Contribution sheet submission flow unit tests

## Summary
Mocked-fetch tests for submission, errors, remaining count and note

## Description
Write TDD unit tests with vi.stubGlobal fetch for ContributionSheet and the client contribution calls.

## How to verify
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/tests/fixtures/api.ts` · `new: contributionFixture` · new
- **Do:** Export contributionFixture shaped like contributionJSON in backend/internal/contribution/handler.go (id,world_id,round_id,player_id,prompt,created_at); fixture values come from that struct, not invented keys
- **Run:** `cd game/frontend && npx tsc --noEmit`
- **Expected:** Fixture type-checks against the Contribution interface

### Step 2 — `game/frontend/tests/contribution.test.tsx` · `new: describe('ContributionSheet')` · new
- **Do:** Add tests: (1) 'posts world_id and prompt': stub fetch resolving 201 contributionFixture, type 'Look behind the shelf' into 'Your idea', click Send, assert fetch called with '/api/v1/contributions' and body containing world_id 'the-boys-room' and the prompt, and the 'Your suggestions' list shows it; (2) 'shows 429 error': fetch resolves 429, assert text 'Slow down, try again shortly'; (3) 'shows remaining and note': render open, assert 'Contributions left: 5' and 'Ideas are considered when the Round closes.'; (4) '401 creates session and retries': fetch resolves 401, then 200 session, then 201, assert three calls in order
- **Run:** `cd game/frontend && npx vitest run tests/contribution.test.tsx`
- **Expected:** All four tests pass

## Acceptance criteria
- Submit posts world_id and prompt
- 429 shows error and failed entry
- Remaining count and close note render
- 401 triggers session then retry

## Definition of done
- Tests pass
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-112.md`

## Links
- Evidence: EVD-022
- Requirement: REQ-054
- Unit (Act): UNIT-107
- Unit (Verify): UNIT-112
- Status: completed
- Change: UPDATE
