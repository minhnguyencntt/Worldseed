# UNIT-158 — Verify: World title display unit tests

## Summary
Unit tests for getWorld and heading title with mocked fetch

## Description
Test getWorld and AdminApp heading with a url-routing fetch stub.

## How to verify
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/tests/fixtures/api.ts` · `new: worldFixture` · after L30
- **Do:** Add exported worldFixture: World mirroring world.World JSON in backend/internal/world/world.go (fields id, title), importing type World from ../../src/api/client; take values from that contract (id the-boys-room, a non-empty title).
- **Run:** `cd game/frontend && npx vitest run tests/adminWorld.test.tsx`
- **Expected:** Fixture type-checks against World and is consumed by the adminWorld tests, which pass.

### Step 2 — `game/frontend/tests/adminWorld.test.tsx` · `new: AdminApp world title` · new
- **Do:** Create jsdom test file following tests/admin.test.tsx stubFetch pattern; test 1: stub fetch returns worldFixture for /api/v1/worlds/the-boys-room, roundFixture for round/current and admin routes with Bearer secret; render AdminApp, enter token secret, assert heading level 1 contains worldFixture.title. Test 2: world URL returns 404 json; assert heading contains 'the-boys-room' and no alert crash.
- **Run:** `cd game/frontend && npx vitest run tests/adminWorld.test.tsx`
- **Expected:** Both tests pass.

## Acceptance criteria
- Title appears when world fetch succeeds.
- Fallback WORLD_ID shown when it fails.

## Definition of done
- Tests pass
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-158.md`

## Links
- Evidence: EVD-034
- Requirement: REQ-078
- Unit (Act): UNIT-155
- Unit (Verify): UNIT-158
- Status: completed
- Change: UPDATE
