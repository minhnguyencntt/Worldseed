# UNIT-413 — Verify: Lockfile node_modules/phaser entry unit tests

## Summary
Unit test asserts 3.90.x version, URL and integrity in the real lockfile

## Description
Add tests to the lockfile test file that read the real lockfile and assert the node_modules/phaser entry.

## How to verify
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/tests/phaserLockfile.test.ts` · `new: describe('lockfile node_modules/phaser entry')` · after the root specifier describe
- **Do:** Add tests reading lock.packages['node_modules/phaser']: version matches /^3\.90\.\d+$/; resolved equals `https://registry.npmjs.org/phaser/-/phaser-${version}.tgz`; integrity matches /^sha512-[A-Za-z0-9+/]+=*$/ and is not the 4.2.1 hash; dependencies.eventemitter3 toBe '^5.0.1'.
- **Run:** `cd game/frontend && npx vitest run tests/phaserLockfile.test.ts -t 'node_modules/phaser entry'`
- **Expected:** All four assertions pass; they fail against the 4.2.1 entry

## Acceptance criteria
- Fails while the entry is 4.2.1.
- Passes with 3.90.0, matching URL, integrity and eventemitter3 range.

## Definition of done
- Tests pass
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-413.md`

## Links
- Evidence: EVD-082
- Requirement: REQ-206
- Unit (Act): UNIT-411
- Unit (Verify): UNIT-413
- Status: completed
- Change: NEW
