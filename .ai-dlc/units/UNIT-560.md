# UNIT-560 — Act: Confirm effectContext dust passes the resolved key to particles

## Summary
Dust branch calls particles with resolveKey(spec.asset) third

## Description
Read the dust branch and confirm resolveKey(spec.asset) is the third argument of scene.add.particles; fix only if not.

## How to act
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/src/phaser/effectContext.ts` · `createPhaserEffectContext.createEffect dust case` · L12-L33
- **Do:** Check that scene.add.particles(area.x, area.y, resolveKey(spec.asset), {...}) is called and chained with .setDepth(spec.depth); change nothing if so.
- **Expected:** Code matches the current read; no diff

## Acceptance criteria
- Third particles argument is resolveKey(spec.asset)
- setDepth(spec.depth) is applied

## Definition of done
- Behavior confirmed
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-560.md`

## Scan baseline
- Scan version: `v1`
- Scan tip: `9cda5131c65b08541fc685d8a0898d39a0e9e9fa`

## Links
- Evidence: EVD-112
- Requirement: REQ-281
- Unit (Act): UNIT-560
- Unit (Verify): UNIT-563
- Status: completed
- Change: UPDATE
