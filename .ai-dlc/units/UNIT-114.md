# UNIT-114 — Verify: Admin token gate and round controls unit tests

## Summary
Mocked-fetch tests for gate, Bearer header, open/close, contributions

## Description
Unit tests for AdminApp and admin client calls with stubbed fetch.

## How to verify
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/tests/fixtures/api.ts` · `new: adminContributionFixture` · after roundFixture
- **Do:** Export adminContributionFixture matching contributionJSON in backend/internal/admin/rounds.go (adds prompt_hash)
- **Run:** `cd game/frontend && npx tsc --noEmit`
- **Expected:** Type-checks

### Step 2 — `game/frontend/tests/admin.test.tsx` · `new: describe('AdminApp')` · new
- **Do:** Tests with a url-routing fetch stub: (1) renders only 'Admin token' input and fetch not called after getCurrentRound; (2) after typing token 'secret' and Enter, fetch called for /api/v1/admin/rounds/<id>?world=the-boys-room with headers Authorization 'Bearer secret' and the Round status shows; (3) click 'Open round' asserts POST .../open?world=the-boys-room, 'Close round' asserts POST .../close; (4) contributions list shows adminContributionFixture.prompt; (5) admin fetch 401 shows 'Invalid token'
- **Run:** `cd game/frontend && npx vitest run tests/admin.test.tsx`
- **Expected:** All five tests pass

## Acceptance criteria
- No fetch before token
- Bearer header sent
- Open and Close POST
- 401 shows Invalid token

## Definition of done
- Tests pass
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-114.md`

## Links
- Evidence: EVD-022
- Requirement: REQ-056
- Unit (Act): UNIT-109
- Unit (Verify): UNIT-114
- Status: completed
- Change: UPDATE
