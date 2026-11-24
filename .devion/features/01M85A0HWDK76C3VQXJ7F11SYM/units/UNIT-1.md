---
id: "01M85A0HWEA6J9HC1H2NRH48XW"
kind: unit
parent: 01M85A0HWE2692Y9TFJTH9C94R
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Act: Add optional interaction to characterSchema

Add interaction: z.object({ dialogue: z.string().optional(), events: z.array(eventSchema).default([]) }).optional() to characterSchema so CharacterSpec carries it.

## Acceptance criteria
- characterSchema parses a character with and without interaction.
- CharacterSpec type includes interaction.


## Scope
- In scope: game/src/content/schema.ts
- Out of scope: tests
- Preserve: Existing fields


## Technical constraints
- Define eventSchema before use (already defined above)
- Code path: `game/src/content/schema.ts`


## Definition of done
- Schema updated; tsc passes


## Clarifying questions
- None
