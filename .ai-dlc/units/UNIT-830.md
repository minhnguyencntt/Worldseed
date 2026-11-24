# UNIT-830 — Act: Add tokens module, Tailwind token plugin and theme values

## Summary
tokens.ts, plugin, theme extension

## Description
Create tokens from PALETTE_RAMPS and expose them via a Tailwind plugin (:root vars) and theme.extend.

## How to act
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/src/lib/tokens.ts` · `new: COLOR_TOKENS, SPACING_TOKENS, TYPE_TOKENS, tokensToCssVars` · new
- **Do:** Import PALETTE_RAMPS from ./palette. Export COLOR_TOKENS as an object mapping ink, plum, moon, hoodie, wood, brass, parchment, lamp to PALETTE_RAMPS[ramp] arrays (no new hex literals). Export SPACING_TOKENS {1:'4px',2:'8px',3:'12px',4:'16px',6:'24px'}. Export TYPE_TOKENS {fontPixel:"'Press Start 2P', monospace", fontBody:"'VT323', monospace", sizeSm:'12px', sizeMd:'16px', sizeLg:'24px'}. Export tokensToCssVars(): Record<string,string> emitting --sf-color-<ramp>-<1..6>, --sf-space-<n>, --sf-font-pixel, --sf-font-body, --sf-size-<sm|md|lg>.

```
export function tokensToCssVars(): Record<string,string> { /* build from the three maps */ }
```

- **Expected:** tokensToCssVars()['--sf-color-brass-4'] equals PALETTE_RAMPS.brass[3]

### Step 2 — `game/frontend/tailwind.config.ts` · `default config (theme.extend, plugins)` · L1-L3
- **Do:** Import plugin from 'tailwindcss/plugin' and tokensToCssVars, SPACING_TOKENS, TYPE_TOKENS. Add theme.extend.colors.sf as an object mapping each COLOR_TOKENS key and step to var(--sf-color-<ramp>-<n>), theme.extend.spacing entries sf-<n> -> var(--sf-space-<n>), fontFamily pixel/body -> var(--sf-font-pixel)/var(--sf-font-body), fontSize sf-sm/md/lg -> var(--sf-size-*). Append plugin(({addBase}) => addBase({':root': tokensToCssVars(), body:{fontFamily:'var(--sf-font-body)'}})) to plugins after animate. Keep colors.pal, background, primary untouched.

```
plugins: [animate, plugin(({ addBase }) => addBase({ ':root': tokensToCssVars() }))]
```

- **Expected:** npm run typecheck passes and config still exposes colors.pal

## Acceptance criteria
- tokensToCssVars returns --sf-color-*, --sf-space-*, --sf-font-* entries
- tailwind.config theme.extend has sf colours, spacing, fontFamily

## Definition of done
- Tokens available as CSS variables and Tailwind values
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-830.md`

## Scan baseline
- Scan version: `v1`
- Scan tip: `9cda5131c65b08541fc685d8a0898d39a0e9e9fa`

## Links
- Evidence: EVD-168
- Requirement: REQ-415
- Unit (Act): UNIT-830
- Unit (Verify): UNIT-834
- Status: completed
- Change: UPDATE
