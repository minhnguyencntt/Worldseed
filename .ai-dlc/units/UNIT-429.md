# UNIT-429 — Verify: game/frontend/node_modules is covered by the real .gitignore unit tests

## Summary
Unit tests for helper and real file

## Description
Tests the helper on samples and on the real ignore file.

## How to verify
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/tests/gitignoreCoverage.test.ts` · `new: gitignore coverage` · new
- **Do:** Add two tests importing isIgnoredByDirRule: (1) real .gitignore text via readFileSync (Node URL alias) with path 'game/frontend/node_modules/phaser/package.json' expects true; (2) text 'game/node_modules/\n' with same path expects false.
- **Run:** `cd game/frontend && npx vitest run tests/gitignoreCoverage.test.ts`
- **Expected:** Both tests pass

## Acceptance criteria
- Given the real .gitignore, then game/frontend/node_modules/phaser/package.json is ignored
- Given only `game/node_modules/`, then the same path is not ignored

## Definition of done
- Tests pass
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-429.md`

## Links
- Evidence: EVD-086
- Requirement: REQ-214
- Unit (Act): UNIT-427
- Unit (Verify): UNIT-429
- Status: completed
- Change: UPDATE
