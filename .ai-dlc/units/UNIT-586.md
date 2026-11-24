# UNIT-586 — Act: Add optional interaction to characterSchema

## Summary
Extend characterSchema with an optional interaction object.

## Description
Add interaction: z.object({ dialogue: z.string().optional(), events: z.array(eventSchema).default([]) }).optional() to characterSchema so CharacterSpec carries it.

## How to act
Follow these steps in order. They name the exact file, symbol and lines; do not substitute a different approach. If a step no longer matches the code, make the smallest change that achieves its expected result and say so in your reply.

### Step 1 — `game/src/content/schema.ts` · `characterSchema` · L53-L60
- **Do:** Add an optional `interaction` key after `animations` using the existing eventSchema, with dialogue optional and events defaulting to an empty array.

```
animations: z.object({...}),
+ interaction: z.object({ dialogue: z.string().optional(), events: z.array(eventSchema).default([]) }).optional(),
```

- **Expected:** CharacterSpec has an optional interaction with dialogue?: string and events: EventSpec[].

## Acceptance criteria
- characterSchema parses a character with and without interaction.
- CharacterSpec type includes interaction.

## Definition of done
- Schema updated; tsc passes
- Write/update persistent AI-DLC artifact `.ai-dlc/units/UNIT-586.md`

## Scan baseline
- Scan version: `v1`
- Scan tip: `9cda5131c65b08541fc685d8a0898d39a0e9e9fa`

## Links
- Evidence: EVD-117
- Requirement: REQ-293
- Unit (Act): UNIT-586
- Unit (Verify): UNIT-589
- Status: approved
- Change: UPDATE
