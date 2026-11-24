# UNIT-550 — Act: Export ResolveKey type and exhaust the effect switch in effectContext

## Summary
Name the resolveKey type for effect context

## Description
Add an exported ResolveKey type to effectContext.ts and use it for the resolveKey parameter, so tests can build a typed mock.

## How to act
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/src/phaser/effectContext.ts` · `new: ResolveKey` · after L4
- **Do:** Add exported type ResolveKey and replace the inline resolveKey parameter type of createPhaserEffectContext with it

```
export type ResolveKey = (id: string) => string;
// resolveKey: (id: string) => string  ->  resolveKey: ResolveKey
```

- **Expected:** tsc reports no new error in effectContext.ts and ResolveKey is importable

## Acceptance criteria
- Given effectContext.ts, When imported, Then ResolveKey is an exported type (id: string) => string
- Given createEffect, When called, Then behavior is unchanged

## Definition of done
- ResolveKey exported and used by createPhaserEffectContext
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-550.md`

## Scan baseline
- Scan version: `v1`
- Scan tip: `9cda5131c65b08541fc685d8a0898d39a0e9e9fa`

## Links
- Evidence: EVD-111
- Requirement: REQ-275
- Unit (Act): UNIT-550
- Unit (Verify): UNIT-554
- Status: approved
- Change: UPDATE
