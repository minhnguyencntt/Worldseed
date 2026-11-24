# UNIT-428 — Verify: .gitignore holds depth-independent node_modules/ rule unit tests

## Summary
Unit test reading real .gitignore

## Description
Test reads the real .gitignore and asserts the rule lines.

## How to verify
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/tests/gitignoreRule.test.ts` · `new: gitignore node_modules rule` · new
- **Do:** Add a test that reads ../../../.gitignore via readFileSync(fileURLToPath(new NodeURL('../../../.gitignore', import.meta.url)),'utf8'), splits lines, and asserts toContain('node_modules/') and not.toContain('game/node_modules/').
- **Run:** `cd game/frontend && npx vitest run tests/gitignoreRule.test.ts`
- **Expected:** Test passes

## Acceptance criteria
- Given the real .gitignore, then lines include node_modules/
- Given the real .gitignore, then lines exclude game/node_modules/

## Definition of done
- Test passes
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-428.md`

## Links
- Evidence: EVD-086
- Requirement: REQ-213
- Unit (Act): UNIT-426
- Unit (Verify): UNIT-428
- Status: completed
- Change: UPDATE
