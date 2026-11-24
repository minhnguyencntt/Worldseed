# UNIT-297 — Verify: zustand dependency declaration and resolution unit tests

## Summary
Unit tests assert package.json, lockfile and import resolution for zustand.

## Description
Write a vitest test reading package.json and package-lock.json from disk and importing zustand. No network or app start.

## How to verify
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/tests/zustandDependency.test.ts` · `new: zustand dependency declaration` · new
- **Do:** Create the test file. Read ../package.json with fs.readFileSync and JSON.parse; assert dependencies.zustand matches /^[\^~]?\d+\.\d+\.\d+/. Read ../package-lock.json; assert packages[''].dependencies.zustand equals the package.json value and packages['node_modules/zustand'].version is a non-empty string.

```
expect(pkg.dependencies.zustand).toMatch(/^[\^~]?\d+\.\d+\.\d+/); expect(lock.packages['node_modules/zustand'].version).toBeTruthy();
```

- **Run:** `cd game/frontend && npx vitest run tests/zustandDependency.test.ts`
- **Expected:** Declaration and lockfile assertions pass.

### Step 2 — `game/frontend/tests/zustandDependency.test.ts` · `it('resolves the zustand import')` · after the declaration tests
- **Do:** Add a test that does `const mod = await import('zustand')` and asserts typeof mod.create === 'function'.

```
const mod = await import('zustand'); expect(typeof mod.create).toBe('function');
```

- **Run:** `cd game/frontend && npx vitest run tests/zustandDependency.test.ts`
- **Expected:** Import test passes; all tests in the file green.

## Acceptance criteria
- Given package.json, when read, then dependencies.zustand matches a semver range
- Given package-lock.json, when read, then root range equals package.json and node_modules/zustand has a version
- Given the import, when evaluated, then create is a function

## Definition of done
- Test passes via the filtered command
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-297.md`

## Links
- Evidence: EVD-059
- Requirement: REQ-148
- Unit (Act): UNIT-296
- Unit (Verify): UNIT-297
- Status: completed
- Change: UPDATE
