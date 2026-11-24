# UNIT-032 — Verify: .gitignore and module config path unit tests

## Summary
Unit test asserts ignore rule and relative config globs

## Description
Context: .gitignore must ignore game/node_modules/; vitest/tsconfig use relative globs. Desired behavior: tests read these files and assert content. Expected result: pass.

## How to verify
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `backend/game/tests/config.test.ts` · `new: it('gitignore targets game/node_modules')` · new
- **Do:** Read ../../.gitignore relative to import.meta.url with readFileSync, split by newline, assert lines include 'game/node_modules/' and that no line includes 'backend/game'.

```
expect(lines).toContain('game/node_modules/')
```

- **Run:** `cd game && npx vitest run tests/config.test.ts`
- **Expected:** test passes

### Step 2 — `backend/game/tests/config.test.ts` · `it('vitest and tsconfig use relative globs')` · after first it
- **Do:** Read vitest.config.ts and tsconfig.json from game/; assert vitest text contains 'tests/**/*.test.ts' and the parsed tsconfig include equals ['src','tests'].

```
expect(JSON.parse(ts).include).toEqual(['src','tests'])
```

- **Run:** `cd game && npx vitest run tests/config.test.ts`
- **Expected:** both tests pass

## Acceptance criteria
- Given .gitignore, when read, then game/node_modules/ is a line and backend/game is absent
- Given game/vitest.config.ts and game/tsconfig.json, when read, then they contain tests/**/*.test.ts and "src"/"tests" includes

## Definition of done
- config.test.ts passes
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-032.md`

## Links
- Evidence: EVD-006
- Requirement: REQ-016
- Unit (Act): UNIT-030
- Unit (Verify): UNIT-032
- Status: completed
- Change: UPDATE
