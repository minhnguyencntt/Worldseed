# UNIT-405 — Verify: phaser dependency declaration unit tests

## Summary
Unit tests assert package.json pins phaser to 3.90.x with no caret.

## Description
Add tests/phaserDependency.test.ts modelled on tests/zustandDependency.test.ts, reading only package.json from disk (no network, no npm install).

## How to verify
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/tests/phaserDependency.test.ts` · `new: describe('phaser dependency declaration')` · new
- **Do:** Create the test file with a readJson helper (readFileSync + fileURLToPath(new URL('../package.json', import.meta.url))) and add test 'pins phaser to 3.90.x' asserting pkg.dependencies.phaser toMatch(/^~?3\.90\.\d+$/).

```
expect(pkg.dependencies.phaser).toMatch(/^~?3\.90\.\d+$/);
```

- **Run:** `cd game/frontend && npx vitest run tests/phaserDependency.test.ts -t "pins phaser to 3.90.x"`
- **Expected:** The test passes.

### Step 2 — `game/frontend/tests/phaserDependency.test.ts` · `new: it('has no caret range that could resolve to 4.x')` · after the first test
- **Do:** Add a test asserting pkg.dependencies.phaser does not start with '^' and does not match /^\D*4\./.

```
expect(pkg.dependencies.phaser.startsWith('^')).toBe(false);
expect(pkg.dependencies.phaser).not.toMatch(/^\D*4\./);
```

- **Run:** `cd game/frontend && npx vitest run tests/phaserDependency.test.ts`
- **Expected:** Both tests in the file pass.

## Acceptance criteria
- Given package.json, when phaser is read, then it matches /^~?3\.90\.\d+$/.
- Given package.json, when phaser is read, then it does not start with ^ and does not match /^\D*4\./.

## Definition of done
- Both tests pass via vitest
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-405.md`

## Links
- Evidence: EVD-080
- Requirement: REQ-202
- Unit (Act): UNIT-404
- Unit (Verify): UNIT-405
- Status: completed
- Change: UPDATE
