# UNIT-421 — Verify: phaser version guard reads real package.json and lockfile

## Summary
Guard test asserts 3.90.x on the real files

## Description
Write tests/phaserVersionGuard.test.ts reading the real files and asserting 3.90.x agreement.

## How to verify
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/tests/phaserVersionGuard.test.ts` · `new: describe('phaser version guard')` · new
- **Do:** Read ../package.json and ../package-lock.json using readFileSync(fileURLToPath(new NodeURL(..., import.meta.url))) with the NodeURL alias as in tests/phaserLockfile.test.ts; add test asserting phaserPinProblems(pkg, lock) toEqual([]) imported from '../src/lib/phaserPin'
- **Run:** `npx vitest run tests/phaserVersionGuard.test.ts`
- **Expected:** Test passes on current files

### Step 2 — `game/frontend/tests/phaserVersionGuard.test.ts` · `it('lockfile root specifier equals package.json')` · after first test
- **Do:** Assert lock.packages[''].dependencies.phaser toBe pkg.dependencies.phaser and that the node_modules/phaser version satisfies the specifier by matching /^3\.90\.\d+$/ and not /^4\./
- **Run:** `npx vitest run tests/phaserVersionGuard.test.ts`
- **Expected:** Passes; would fail on any 4.x change

## Acceptance criteria
- Real files produce no problems
- Root specifier equals package.json specifier

## Definition of done
- Guard passes
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-421.md`

## Links
- Evidence: EVD-084
- Requirement: REQ-210
- Unit (Act): UNIT-419
- Unit (Verify): UNIT-421
- Status: completed
- Change: UPDATE
