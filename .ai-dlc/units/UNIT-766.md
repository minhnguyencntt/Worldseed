# UNIT-766 — Act: Create the shared palette module

## Summary
Add game/frontend/src/lib/palette.ts

## Description
Create palette.ts with 8 ramps of 6 colours and the exported constants.

## How to act
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/src/lib/palette.ts` · `new: PALETTE_RAMPS` · new
- **Do:** Create the file and export const PALETTE_RAMPS as a Record<string, readonly string[]> with the eight ramps below, each ordered dark to light with exactly 6 lowercase hex strings.

```
export const PALETTE_RAMPS = {
  indigo: ['#0b0a1e','#15133a','#221f57','#34307a','#4d49a0','#7571c4'],
  plum: ['#1f0f24','#38183f','#56235e','#79347f','#a0529f','#c985c2'],
  moon: ['#1b2b4a','#2a4470','#3f629a','#6288c2','#95b4de','#cfe0f5'],
  hoodie: ['#0f2a5c','#173f8a','#2159b8','#3a7de0','#69a3f0','#a6caf8'],
  wood: ['#2a160d','#472613','#6b3b1d','#8f5528','#b97a3d','#dba468'],
  brass: ['#4a3410','#735217','#a37a1f','#cfa22c','#ecc84a','#fbe888'],
  parchment: ['#6b5a45','#957f60','#bba580','#d9c79f','#efe3c0','#fbf4df'],
  lamp: ['#5c1f0a','#8f3410','#c4511a','#ee7a2a','#f9a84a','#fdd58a'],
} as const;
```

- **Expected:** PALETTE_RAMPS has 8 keys, 6 colours each.

### Step 2 — `game/frontend/src/lib/palette.ts` · `new: PALETTE, WARM_RAMPS, COOL_RAMPS` · after PALETTE_RAMPS
- **Do:** Export WARM_RAMPS = ['wood','brass','parchment','lamp'] and COOL_RAMPS = ['indigo','plum','moon','hoodie'] as const arrays, and export const PALETTE: readonly string[] = Object.values(PALETTE_RAMPS).flat().

```
export const WARM_RAMPS = ['wood','brass','parchment','lamp'] as const;
export const COOL_RAMPS = ['indigo','plum','moon','hoodie'] as const;
export const PALETTE: readonly string[] = Object.values(PALETTE_RAMPS).flat();
```

- **Expected:** PALETTE.length is 48.

## Acceptance criteria
- palette.ts exports PALETTE_RAMPS, PALETTE, WARM_RAMPS, COOL_RAMPS with 48 unique hex values.
- No other file defines palette colours.

## Definition of done
- palette.ts compiles under tsc --noEmit
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-766.md`

## Scan baseline
- Scan version: `v1`
- Scan tip: `9cda5131c65b08541fc685d8a0898d39a0e9e9fa`

## Links
- Evidence: EVD-156
- Requirement: REQ-383
- Unit (Act): UNIT-766
- Unit (Verify): UNIT-769
- Status: completed
- Change: UPDATE
