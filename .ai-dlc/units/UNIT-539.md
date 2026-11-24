# UNIT-539 — Act: Name the resolveKey type in effectContext

## Summary
Export ResolveKey alias used by createPhaserEffectContext

## Description
Export a ResolveKey type alias so tests and BootScene share the second-argument contract of createPhaserEffectContext.

## How to act
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/src/phaser/effectContext.ts` · `new: ResolveKey` · L5-L9
- **Do:** Add an exported type alias ResolveKey above createPhaserEffectContext and use it for the resolveKey parameter.

```
export type ResolveKey = (id: string) => string;
resolveKey: (id: string) => string, -> resolveKey: ResolveKey,
```

- **Expected:** The signature is unchanged in shape and the alias is exported

## Acceptance criteria
- Given effectContext.ts, When imported, Then ResolveKey is exported as (id: string) => string
- Given createPhaserEffectContext, When called, Then it still takes (scene, resolveKey)

## Definition of done
- ResolveKey exported and used in the signature
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-539.md`

## Scan baseline
- Scan version: `v1`
- Scan tip: `9cda5131c65b08541fc685d8a0898d39a0e9e9fa`

## Links
- Evidence: EVD-109
- Requirement: REQ-270
- Unit (Act): UNIT-539
- Unit (Verify): UNIT-542
- Status: approved
- Change: UPDATE
