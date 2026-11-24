# UNIT-481 — Verify: buildScene ordering and count unit tests

## Summary
Unit tests for buildScene

## Description
Test buildScene against REQ3 criteria with a fake context.

## How to verify
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/tests/buildScene.test.ts` · `new: buildScene tests` · new
- **Do:** With a fake ctx (vi.fn createSprite returning handle mocks) and a SceneSpec built from validScene with three objects whose layer is objects, background, furniture, add tests: result layers order is background, furniture, objects; createSprite call count equals 3; scene with objects [] returns [] and createSprite not called.
- **Run:** `cd game && npx vitest run tests/buildScene.test.ts`
- **Expected:** All three tests pass

## Acceptance criteria
- Order and count tests pass
- Empty scene test passes

## Definition of done
- Tests green
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-481.md`

## Links
- Evidence: EVD-096
- Requirement: REQ-240
- Unit (Act): UNIT-478
- Unit (Verify): UNIT-481
- Status: completed
- Change: UPDATE
