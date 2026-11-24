# UNIT-513 — Verify: Fallback texture and key resolution

## Summary
Unit tests for resolveKey and effect context

## Description
Test BootScene.resolveKey and effectContext key usage with mocked Phaser.

## How to verify
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/tests/bootSceneFallback.test.ts` · `new: fallback resolution` · new
- **Do:** Mock phaser; construct BootScene; assert resolveKey('objects/bed') returns 'objects/bed', resolveKey('nope') returns 'fallback:missing'; add 'objects/bed' to failed via the registered loaderror handler (captured from a mocked load.on) and assert resolveKey('objects/bed') returns 'fallback:missing'. Separately call createPhaserEffectContext with a fake scene whose add.particles is vi.fn returning chainable setDepth and resolveKey=()=>'fallback:missing'; createEffect a dust spec and assert particles third arg is 'fallback:missing'.
- **Run:** `cd game/frontend && npx vitest run tests/bootSceneFallback.test.ts`
- **Expected:** Test passes

## Acceptance criteria
- unknown and failed ids return fallback
- dust uses resolved key

## Definition of done
- tests pass
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-513.md`

## Links
- Evidence: EVD-103
- Requirement: REQ-256
- Unit (Act): UNIT-511
- Unit (Verify): UNIT-513
- Status: completed
- Change: UPDATE
