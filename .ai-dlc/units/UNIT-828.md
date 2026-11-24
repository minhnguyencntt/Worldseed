# UNIT-828 — Verify: Phaser effect context renders lighting effects with mocked scene

## Summary
Mocked-scene tests for createPhaserEffectContext

## Description
Unit tests with a fake Phaser scene.

## How to verify
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/tests/effectContext.test.ts` · `new: createPhaserEffectContext lighting` · new
- **Do:** Build a fake scene with vi.fn() add.rectangle, add.circle, add.particles and scale {width:480,height:270}; each returned object has chainable setOrigin, setDepth, setBlendMode, setStrokeStyle and a destroy spy. Tests: for moonlightShaft, lampGlow, doorLight, vignette specs with depth 400, assert setDepth(400) called and destroy() destroys all created objects (3 for vignette); for dust, assert add.particles called with key from a resolveKey stub returning 'dust-key'.
- **Run:** `cd game/frontend && npx vitest run tests/effectContext.test.ts`
- **Expected:** All tests pass

## Acceptance criteria
- Each effect sets depth
- Vignette destroys all bands
- Dust uses resolveKey result

## Definition of done
- Tests pass
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-828.md`

## Links
- Evidence: EVD-167
- Requirement: REQ-413
- Unit (Act): UNIT-825
- Unit (Verify): UNIT-828
- Status: completed
- Change: UPDATE
