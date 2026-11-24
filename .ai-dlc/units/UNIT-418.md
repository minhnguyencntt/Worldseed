# UNIT-418 — Act: Add phaserPinProblems helper

## Summary
Create the pure phaser pin checker

## Description
Create src/lib/phaserPin.ts exporting phaserPinProblems(pkg, lock) that validates the three phaser fields against 3.90.x.

## How to act
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/src/lib/phaserPin.ts` · `new: phaserPinProblems` · new
- **Do:** Create the file exporting phaserPinProblems(pkg, lock) returning string[]; check pkg.dependencies.phaser, lock.packages[''].dependencies.phaser and lock.packages['node_modules/phaser'].version each match the regex, pushing a message naming the field when they do not or are missing

```
const PIN = /^~?3\.90\.\d+$/;
export function phaserPinProblems(pkg: any, lock: any): string[] {
  const out: string[] = [];
  const a = pkg?.dependencies?.phaser;
  const b = lock?.packages?.['']?.dependencies?.phaser;
  const c = lock?.packages?.['node_modules/phaser']?.version;
  if (typeof a !== 'string' || !PIN.test(a)) out.push(`package.json dependencies.phaser is not 3.90.x: ${a}`);
  if (typeof b !== 'string' || !PIN.test(b)) out.push(`lockfile root phaser specifier is not 3.90.x: ${b}`);
  if (typeof c !== 'string' || !/^3\.90\.\d+$/.test(c)) out.push(`lockfile node_modules/phaser version is not 3.90.x: ${c}`);
  if (typeof a === 'string' && a !== b) out.push(`package.json (${a}) and lockfile root (${b}) specifiers differ`);
  return out;
}
```

- **Expected:** Module compiles and exports phaserPinProblems

## Acceptance criteria
- Returns [] for 3.90.x inputs
- Returns one message per bad field for 4.x inputs

## Definition of done
- npm run typecheck passes
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-418.md`

## Scan baseline
- Scan version: `v1`
- Scan tip: `9cda5131c65b08541fc685d8a0898d39a0e9e9fa`

## Links
- Evidence: EVD-084
- Requirement: REQ-209
- Unit (Act): UNIT-418
- Unit (Verify): UNIT-420
- Status: completed
- Change: UPDATE
