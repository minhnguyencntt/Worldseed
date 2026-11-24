# UNIT-403 — Verify: Phaser modules work on 3.90 unit tests

## Summary
Existing Phaser tests and runtime version assertion

## Description
Run the existing phaser unit tests and add an assertion on the installed Phaser version.

## How to verify
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/tests/phaserConfig.test.ts` · `new: it('uses Phaser 3.90')` · after L1
- **Do:** Add a test that reads version from node_modules/phaser/package.json via node:fs readFileSync and expects it to match /^3\.90\./; keep existing tests unchanged.

```
expect(JSON.parse(readFileSync('node_modules/phaser/package.json','utf8')).version).toMatch(/^3\.90\./)
```

- **Run:** `cd game/frontend && npx vitest run tests/phaserConfig.test.ts tests/bootScene.test.ts tests/phaserHost.test.tsx`
- **Expected:** All tests in those files pass

## Acceptance criteria
- Installed Phaser.VERSION is 3.90.x
- Config, boot scene and host tests pass

## Definition of done
- Tests pass
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-403.md`

## Links
- Evidence: EVD-079
- Requirement: REQ-201
- Unit (Act): UNIT-401
- Unit (Verify): UNIT-403
- Status: completed
- Change: UPDATE
