# UNIT-565 — Act: Make createEffect switch exhaustive

## Summary
Add never-check default to createEffect

## Description
Add a default branch after the transition case in createEffect so every path returns or throws.

## How to act
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/src/phaser/effectContext.ts` · `createPhaserEffectContext.createEffect` · L53-L56
- **Do:** After the transition case returning { destroy: () => {} }, add a default case that assigns spec to a never-typed constant and throws an Error naming the unsupported effect type.

```
default: {
  const unsupported: never = spec;
  throw new Error(`Unsupported effect type: ${(unsupported as { type: string }).type}`);
}
```

- **Expected:** tsc reports no TS2366 for effectContext.ts

## Acceptance criteria
- Switch has a default branch that throws
- tsc reports no TS2366 for effectContext.ts

## Definition of done
- default branch throws for unknown type
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-565.md`

## Scan baseline
- Scan version: `v1`
- Scan tip: `9cda5131c65b08541fc685d8a0898d39a0e9e9fa`

## Links
- Evidence: EVD-113
- Requirement: REQ-283
- Unit (Act): UNIT-565
- Unit (Verify): UNIT-568
- Status: approved
- Change: UPDATE
