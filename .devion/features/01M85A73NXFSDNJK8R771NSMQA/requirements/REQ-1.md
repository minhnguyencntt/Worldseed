---
id: "01M85A73NYGQRF29FRJC5Q2F4V"
kind: requirement
parent: 01M85A73NXFSDNJK8R771NSMQA
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# REQ · characterSchema accepts an optional interaction with a dialogue reference or actions

Context: characterSchema lacks any interaction data. Desired behavior: interaction is optional, with an optional string dialogue reference and an optional array of actionSchema items. Expected result: valid shapes parse, invalid ones are rejected, and existing characters are unaffected. Why: lets content authors define NPC interaction without engine changes.

## Acceptance criteria
- Given a character with no interaction, When characterSchema.parse runs, Then it succeeds with interaction undefined
- Given interaction { dialogue: 'npc-greeting' }, When parsed, Then the dialogue reference is retained
- Given interaction { actions: [valid inspect action] }, When parsed, Then actions are retained
- Given interaction { dialogue: 5 }, When parsed, Then a ZodError is thrown


## Scope
- In scope: characterInteractionSchema and optional field on characterSchema
- Out of scope: Runtime handling of the interaction
- Preserve: Existing characterSchema fields and defaults


## Technical constraints
- Reuse actionSchema defined above characterSchema


## Definition of done
- Schema change merged
- Types infer interaction on CharacterSpec


## Clarifying questions
- None
