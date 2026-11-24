# UNIT-558 — Act: Export ResolveKey type from effectContext

## Summary
Name the resolveKey type and use it in the factory

## Description
Add an exported ResolveKey type in effectContext.ts and use it for the resolveKey parameter of createPhaserEffectContext.

## How to act
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/frontend/src/phaser/effectContext.ts` · `new: ResolveKey` · after L3
- **Do:** Add the exported type alias ResolveKey above createPhaserEffectContext.

```
export type ResolveKey = (id: string) => string;
```

- **Expected:** Type is importable from effectContext

### Step 2 — `game/frontend/src/phaser/effectContext.ts` · `createPhaserEffectContext` · L6-L9
- **Do:** Change the resolveKey parameter type from the inline function type to ResolveKey.

```
resolveKey: (id: string) => string -> resolveKey: ResolveKey
```

- **Expected:** Signature unchanged in meaning

## Acceptance criteria
- effectContext.ts exports ResolveKey
- createPhaserEffectContext still takes (scene, resolveKey)

## Definition of done
- ResolveKey exported and used
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-558.md`

## Scan baseline
- Scan version: `v1`
- Scan tip: `9cda5131c65b08541fc685d8a0898d39a0e9e9fa`

## Links
- Evidence: EVD-112
- Requirement: REQ-279
- Unit (Act): UNIT-558
- Unit (Verify): UNIT-561
- Status: completed
- Change: UPDATE
