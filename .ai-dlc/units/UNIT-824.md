# UNIT-824 — Act: Add lighting effect schema variants and author them in bedroom.yaml

## Summary
Extend effectSchema and bedroom effects

## Description
Add four zod variants to effectSchema and declare the effects in bedroom.yaml, replacing the non-palette ambientLight colour with a palette colour.

## How to act
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/src/content/schema.ts` · `effectSchema` · L11-L15
- **Do:** Add four z.object variants to the discriminated union before the transition variant: moonlightShaft, lampGlow, doorLight, vignette.

```
z.object({ type: z.literal('moonlightShaft'), color: z.string(), alpha: z.number().min(0).max(1), area: boundsSchema }),
z.object({ type: z.literal('lampGlow'), color: z.string(), alpha: z.number().min(0).max(1), x: z.number(), y: z.number(), radius: z.number().positive() }),
z.object({ type: z.literal('doorLight'), color: z.string(), alpha: z.number().min(0).max(1), area: boundsSchema }),
z.object({ type: z.literal('vignette'), color: z.string(), alpha: z.number().min(0).max(1) }),
```

- **Expected:** EffectSpec type includes the four new variants and tsc --noEmit passes in game/

### Step 2 — `game/src/content/worlds/the-boys-room/scenes/bedroom.yaml` · `effects` · L259-L269
- **Do:** Change the ambientLight color from '#ffd9a0' to the palette value '#fdd58a' and insert four entries after it, placed near the window (60,30), lamp (80,120) and door (410,100) objects, using palette hexes moon5 '#cfe0f5', lamp4 '#f9a84a', lamp6 '#fdd58a', indigo1 '#0b0a1e'.

```
  - type: moonlightShaft
    color: '#cfe0f5'
    alpha: 0.18
    area: { x: 60, y: 30, width: 90, height: 200 }
  - type: lampGlow
    color: '#f9a84a'
    alpha: 0.25
    x: 96
    y: 130
    radius: 48
  - type: doorLight
    color: '#fdd58a'
    alpha: 0.5
    area: { x: 410, y: 162, width: 32, height: 2 }
  - type: vignette
    color: '#0b0a1e'
    alpha: 0.45
```

- **Expected:** loadWorld validates the bedroom scene with six non-transition effects

## Acceptance criteria
- effectSchema parses the four new types
- bedroom.yaml lists six non-transition effects with PALETTE colours

## Definition of done
- Schema and YAML updated; typecheck passes
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-824.md`

## Scan baseline
- Scan version: `v1`
- Scan tip: `9cda5131c65b08541fc685d8a0898d39a0e9e9fa`

## Links
- Evidence: EVD-167
- Requirement: REQ-412
- Unit (Act): UNIT-824
- Unit (Verify): UNIT-827
- Status: completed
- Change: UPDATE
