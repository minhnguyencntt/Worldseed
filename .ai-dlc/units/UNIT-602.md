# UNIT-602 — Act: Confirm characterSchema exposes the defaults and rules the tests assert

## Summary
Confirm characterSchema keeps scale, layer, idle and interaction rules in schema.ts.

## Description
Read characterSchema in game/src/content/schema.ts and confirm the defaults and required fields the tests need exist and are exported. Edit only if one is missing.

## How to act
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/src/content/schema.ts` · `characterSchema` · L52-L60
- **Do:** Check that scale is z.number().positive().default(1), layer is layerSchema.default('characters') and animations.idle is a required animRef; add any that is missing and make no other edit.

```
scale: z.number().positive().default(1),
layer: layerSchema.default('characters'),
```

- **Run:** `cd game && grep -n "default(1)\|default('characters')" src/content/schema.ts`
- **Expected:** Both defaults are listed in characterSchema.

## Acceptance criteria
- characterSchema is a named export of game/src/content/schema.ts
- characterSchema defines scale default 1, layer default 'characters' and required animations.idle

## Definition of done
- characterSchema has the three rules and the typecheck passes
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-602.md`

## Scan baseline
- Scan version: `v1`
- Scan tip: `9cda5131c65b08541fc685d8a0898d39a0e9e9fa`

## Links
- Evidence: EVD-122
- Requirement: REQ-301
- Unit (Act): UNIT-602
- Unit (Verify): UNIT-605
- Status: completed
- Change: UPDATE
