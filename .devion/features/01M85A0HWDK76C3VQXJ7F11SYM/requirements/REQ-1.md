---
id: "01M85A0HWE2692Y9TFJTH9C94R"
kind: requirement
parent: 01M85A0HWDK76C3VQXJ7F11SYM
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# REQ · Scene character schema accepts optional dialogue or interaction

Context: characterSchema has no way to attach dialogue or interaction to an NPC. Desired behavior: add an optional interaction object { dialogue?: string, events: event[] } so NPCs can open a dialogue node or fire events from data. Expected result: characters without interaction still parse unchanged. Why: lets NPCs be authored purely in scene data.

## Acceptance criteria
- Given a character with interaction { dialogue: 'greet' }, When sceneSchema parses it, Then the parsed character has interaction.dialogue 'greet' and events [].
- Given a character without interaction, When sceneSchema parses it, Then it passes and interaction is undefined.
- Given an interaction whose dialogue is a number, When parsed, Then a path-tagged error mentions characters.0.interaction.dialogue.


## Scope
- In scope: characterSchema in game/src/content/schema.ts
- In scope: CharacterSpec inferred type
- Out of scope: Loader reference validation
- Out of scope: Phaser wiring
- Preserve: Existing character fields and defaults


## Technical constraints
- Reuse eventSchema for events


## Definition of done
- Schema extended and type inferred


## Clarifying questions
- None
