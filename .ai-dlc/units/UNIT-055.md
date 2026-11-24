# UNIT-055 — Verify: Type-check config unit tests

## Summary
Unit tests prove tsconfig and package.json declare Node types

## Description
Test that tsconfig.json types includes node and package.json lists @types/node, so the tsc gate is satisfied.

## How to verify
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/tests/typecheck.test.ts` · `new: describe('type-check config')` · new
- **Do:** Create the file; read tsconfig.json and package.json with readFileSync(join(process.cwd(), ...)) and JSON.parse. Add test 'tsconfig types include node' asserting compilerOptions.types toEqual expect.arrayContaining(['node','vite/client','vitest/globals']), and test 'package declares @types/node' asserting devDependencies['@types/node'] is defined.

```
expect(tsconfig.compilerOptions.types).toEqual(expect.arrayContaining(['node','vite/client','vitest/globals']));
```

- **Run:** `cd game/frontend && npx vitest run tests/typecheck.test.ts`
- **Expected:** Both tests pass.

## Acceptance criteria
- Test asserts tsconfig types contains node, vite/client and vitest/globals
- Test asserts @types/node is in devDependencies

## Definition of done
- Test passes
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-055.md`

## Links
- Evidence: EVD-011
- Requirement: REQ-027
- Unit (Act): UNIT-053
- Unit (Verify): UNIT-055
- Status: completed
- Change: UPDATE
