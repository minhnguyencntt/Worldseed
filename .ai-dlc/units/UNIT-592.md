# UNIT-592 — Act: Add optional interaction to characterSchema

## Summary
Add characterInteractionSchema and optional interaction field

## Description
Edit game/src/content/schema.ts: define an interaction object schema with optional dialogue string and optional actions array of actionSchema, and add it as an optional field of characterSchema.

## How to act
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/src/content/schema.ts` · `new: characterInteractionSchema` · after L45
- **Do:** Add an exported zod object schema characterInteractionSchema with optional dialogue (z.string()) and optional actions (z.array(actionSchema)), placed before characterSchema.

```
export const characterInteractionSchema = z.object({
  dialogue: z.string().optional(),
  actions: z.array(actionSchema).optional(),
});
```

- **Expected:** characterInteractionSchema is exported and compiles

### Step 2 — `game/src/content/schema.ts` · `characterSchema` · L47-L54
- **Do:** Add the field interaction: characterInteractionSchema.optional() after the animations field.

```
animations: z.object({...}),
+ interaction: characterInteractionSchema.optional(),
```

- **Expected:** CharacterSpec includes optional interaction

## Acceptance criteria
- characterSchema has an optional interaction field
- CharacterSpec infers interaction with optional dialogue and actions

## Definition of done
- Field added and project type-checks
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-592.md`

## Scan baseline
- Scan version: `v1`
- Scan tip: `9cda5131c65b08541fc685d8a0898d39a0e9e9fa`

## Links
- Evidence: EVD-118
- Requirement: REQ-296
- Unit (Act): UNIT-592
- Unit (Verify): UNIT-593
- Status: completed
- Change: NEW
