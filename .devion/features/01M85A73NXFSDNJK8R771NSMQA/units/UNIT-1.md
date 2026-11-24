---
id: "01M85A73NYWST3WABDSDD0W89C"
kind: unit
parent: 01M85A73NYGQRF29FRJC5Q2F4V
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Act: Add optional interaction to characterSchema

Edit game/src/content/schema.ts: define an interaction object schema with optional dialogue string and optional actions array of actionSchema, and add it as an optional field of characterSchema.

## Acceptance criteria
- characterSchema has an optional interaction field
- CharacterSpec infers interaction with optional dialogue and actions


## Scope
- In scope: game/src/content/schema.ts
- Out of scope: Tests
- Out of scope: bedroom.yaml
- Preserve: Existing exports and defaults


## Technical constraints
- zod
- Code path: `game/src/content/schema.ts`


## Definition of done
- Field added and project type-checks


## Clarifying questions
- None
