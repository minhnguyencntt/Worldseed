# UNIT-767 — Act: Export palette Tailwind colours and register them in tailwind.config.ts

## Summary
Add paletteTailwindColors and colors.pal

## Description
Derive the Tailwind colour object from PALETTE_RAMPS and add it to the Tailwind theme.

## How to act
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/src/lib/palette.ts` · `new: paletteTailwindColors` · after PALETTE
- **Do:** Export paletteTailwindColors built from PALETTE_RAMPS: each ramp name maps to an object whose keys are '1'..'6' and values are the hex.

```
export const paletteTailwindColors: Record<string, Record<string, string>> = Object.fromEntries(
  Object.entries(PALETTE_RAMPS).map(([name, steps]) => [
    name,
    Object.fromEntries(steps.map((hex, i) => [String(i + 1), hex])),
  ]),
);
```

- **Expected:** paletteTailwindColors.wood['3'] is '#6b3b1d'.

### Step 2 — `game/frontend/tailwind.config.ts` · `default export colors` · L1-L4
- **Do:** Import paletteTailwindColors from './src/lib/palette' after line 2 and add pal: paletteTailwindColors inside theme.extend.colors next to muted and border, leaving other keys unchanged.

```
import { paletteTailwindColors } from './src/lib/palette';
... muted:'hsl(var(--muted))', border:'hsl(var(--border))', pal: paletteTailwindColors }
```

- **Expected:** theme.extend.colors.pal is defined; background is still hsl(var(--background)).

## Acceptance criteria
- paletteTailwindColors maps ramp -> step number -> hex.
- tailwind.config.ts theme.extend.colors.pal equals it and old tokens remain.

## Definition of done
- tsc --noEmit passes
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-767.md`

## Scan baseline
- Scan version: `v1`
- Scan tip: `9cda5131c65b08541fc685d8a0898d39a0e9e9fa`

## Links
- Evidence: EVD-156
- Requirement: REQ-384
- Unit (Act): UNIT-767
- Unit (Verify): UNIT-770
- Status: completed
- Change: UPDATE
