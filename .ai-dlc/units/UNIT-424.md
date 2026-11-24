# UNIT-424 — Verify: .gitignore ignores node_modules at any depth

## Summary
Unit test on .gitignore content

## Description
Test reads root .gitignore and asserts the node_modules rule.

## How to verify
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/tests/gitignoreNodeModules.test.ts` · `new: gitignore ignores node_modules` · new
- **Do:** Add a vitest test that reads resolve(__dirname,'../../../.gitignore') with readFileSync, splits into trimmed lines, and expects lines to contain 'node_modules/' and '.devion/cache/'.

```
expect(lines).toContain('node_modules/');
expect(lines).toContain('.devion/cache/');
```

- **Run:** `cd game/frontend && npx vitest run tests/gitignoreNodeModules.test.ts`
- **Expected:** Test passes, 1 test file green

## Acceptance criteria
- Given .gitignore, then a node_modules/ line is present
- Given .gitignore, then the original .devion/cache/ line is still present

## Definition of done
- Test passes
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-424.md`

## Links
- Evidence: EVD-085
- Requirement: REQ-211
- Unit (Act): UNIT-422
- Unit (Verify): UNIT-424
- Status: completed
- Change: UPDATE
