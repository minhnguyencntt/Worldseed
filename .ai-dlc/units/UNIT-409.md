# UNIT-409 — Verify: Lockfile node_modules/phaser entry unit tests

## Summary
Unit tests for resolved version, URL and integrity

## Description
Tests read package-lock.json from disk only.

## How to verify
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/tests/phaserLockEntry.test.ts` · `new: describe('phaser lockfile node_modules entry')` · new
- **Do:** Create the file reading package-lock.json with the NodeURL alias pattern; add test 'resolves 3.90.0' asserting entry.version === '3.90.0' and entry.resolved === 'https://registry.npmjs.org/phaser/-/phaser-3.90.0.tgz'; add test 'integrity and deps' asserting entry.integrity equals the 3.90.0 sha512 string, entry.dependencies.eventemitter3 === '^5.0.1', and packages['node_modules/eventemitter3'].version === '5.0.4'
- **Run:** `cd game/frontend && npx vitest run tests/phaserLockEntry.test.ts`
- **Expected:** Both tests pass

## Acceptance criteria
- version is 3.90.0 and resolved URL is the 3.90.0 tarball
- integrity equals the 3.90.0 sha512 and eventemitter3 range is satisfied by the locked version

## Definition of done
- Tests pass
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-409.md`

## Links
- Evidence: EVD-081
- Requirement: REQ-204
- Unit (Act): UNIT-407
- Unit (Verify): UNIT-409
- Status: completed
- Change: UPDATE
