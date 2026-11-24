---
id: "01M85A73NXFSDNJK8R771NSMQA"
kind: intent
parent: null
status: draft
links: []
agent: null
source: llm
evidence: {"project_id":"944dfe9c-3760-4ab1-81a3-865a561626d8"}
---
# SG-6.1.1 Optional interaction field on the character schema

Context: characterSchema in game/src/content/schema.ts has id, name, position, scale, layer and animations only, so an NPC cannot declare what happens when it is clicked. Desired behavior: add an optional interaction field holding a dialogue reference and/or a list of actions, reusing the existing actionSchema. Expected result: scene content with and without the field parses, and malformed interactions are rejected. Why: SG-6.1 data-driven NPCs need content-authored interaction.

## Acceptance criteria
- Given a character without interaction, When parsed with characterSchema, Then it still succeeds and interaction is undefined
- Given a character with interaction.dialogue 'npc-greeting', When parsed, Then interaction.dialogue equals 'npc-greeting'
- Given a character with an interaction actions list of valid actions, When parsed, Then the actions are preserved
- Given an interaction with an action whose id is not allowed or with a non-string dialogue, When parsed, Then parsing fails


## Scope
- In scope: characterSchema optional interaction field
- In scope: CharacterSpec type inference
- In scope: unit tests in game/tests
- Out of scope: Phaser rendering of NPC clicks
- Out of scope: bedroom.yaml content changes
- Out of scope: validateWorld cross-reference checks
- Preserve: Existing character fields and defaults
- Preserve: bedroom.yaml still parses
- Preserve: actionSchema behavior


## Technical constraints
- Use zod in game/src/content/schema.ts
- Reuse actionSchema; do not invent new action ids


## Definition of done
- characterSchema accepts optional interaction
- Unit tests for it pass


## Clarifying questions
- None
