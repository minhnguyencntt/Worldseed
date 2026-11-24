---
id: "01M85A0HWDK76C3VQXJ7F11SYM"
kind: intent
parent: null
status: draft
links: []
agent: null
source: llm
evidence: {"project_id":"944dfe9c-3760-4ab1-81a3-865a561626d8"}
---
# SG-6.1 Data-driven NPC support from scene data

Context: characterSchema (game/src/content/schema.ts) already holds id, name, position, scale, layer and idle/walk/interact animation refs. BootScene.createCharacter already spawns and animates sprites from scene.characters. Desired behavior: a scene author can add any NPC, with optional dialogue or interaction, in scene YAML only. Dangling character references are caught by validation, and clicking an NPC reports its interaction to React, with no code change. Why: future AI cycles must add characters without touching the engine.

## Acceptance criteria
- Given a scene YAML character with an interaction block, When parseWorldContent('scene') runs, Then it validates and keeps the interaction data.
- Given a scene character whose id is not in world.characters, or whose interaction names an unknown dialogue, When validateWorld runs, Then it returns a descriptive error.
- Given a scene with several characters, When BootScene.create runs, Then one sprite is created per character at its position and each plays its idle animation.
- Given a character with an interaction, When its sprite is clicked, Then a characterClick event with its id and dialogue id is emitted.


## Scope
- In scope: characterSchema optional interaction field
- In scope: validateWorld checks for scene characters
- In scope: BootScene NPC click event
- In scope: characterClick bus event
- Out of scope: New art assets
- Out of scope: React dialogue UI changes
- Out of scope: Backend/API changes
- Out of scope: Pathfinding or NPC movement
- Preserve: Existing boy character behavior and animation resolution
- Preserve: Existing manifest and preload planning


## Technical constraints
- Phaser 3.90 APIs only
- Zod schemas stay the single source of content validation
- Engine code must stay free of hardcoded character ids


## Definition of done
- All requirements have Act and Verify units complete
- Unit tests for the three slices pass


## Clarifying questions
- None
