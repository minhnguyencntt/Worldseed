# UNIT-113 — Verify: Countdown and Round badge unit tests

## Summary
Fake-timer tests for countdown and badge

## Description
Unit tests with vi.useFakeTimers and mocked fetch.

## How to verify
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/tests/fixtures/api.ts` · `new: roundFixture` · after contributionFixture
- **Do:** Export roundFixture shaped like world.Round in backend/internal/world/world.go (id,number,status,starts_at,ends_at json keys)
- **Run:** `cd game/frontend && npx tsc --noEmit`
- **Expected:** Fixture type-checks as RoundInfo

### Step 2 — `game/frontend/tests/countdown.test.tsx` · `new: describe('Countdown and RoundBadge')` · new
- **Do:** Tests: formatRemaining(90000)==='00:01:30' and formatRemaining(0)==='Round closed'; Countdown with now fixed 90s before endsAt and fake timers advanced 1000ms shows '00:01:29' using an incrementing now stub; RoundBadge status 'OPEN' shows OPEN and undefined shows 'Round unavailable'
- **Run:** `cd game/frontend && npx vitest run tests/countdown.test.tsx`
- **Expected:** All tests pass

## Acceptance criteria
- 00:01:30 then 00:01:29
- Past end shows closed
- Badge OPEN and fallback

## Definition of done
- Tests pass
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-113.md`

## Links
- Evidence: EVD-022
- Requirement: REQ-055
- Unit (Act): UNIT-108
- Unit (Verify): UNIT-113
- Status: completed
- Change: UPDATE
