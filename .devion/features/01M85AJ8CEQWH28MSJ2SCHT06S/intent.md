---
id: "01M85AJ8CEQWH28MSJ2SCHT06S"
kind: intent
parent: null
status: draft
links: []
agent: null
source: llm
evidence: {"project_id":"944dfe9c-3760-4ab1-81a3-865a561626d8"}
---
# SG-6.1.3 Validate scene characters against the world's character list

Context: SceneDef.characters (CharacterSpec[]) is accepted by sceneSchema, but validateWorld in game/src/content/loader.ts only checks dialogue speakers and say events against world.characters, so a scene character with an unknown id passes validation. Desired behavior: validateWorld reports each unknown scene character id with a path-tagged issue. Expected result: unknown ids are rejected and unit tests prove it. Why: scene NPCs must reference declared world characters.

## Acceptance criteria
- Given a scene character whose id is not in world.characters, When validateWorld runs, Then the returned errors contain an entry tagged with the path scenes.<sceneId>.characters.<index>.id naming the unknown id
- Given a world whose scene characters all exist in world.characters, When validateWorld runs, Then no character-related error is returned and the-boys-room content still validates


## Scope
- In scope: validateWorld scene character id check
- In scope: unit tests
- Out of scope: character interaction dialogue or action event checks
- Out of scope: schema changes
- Out of scope: Phaser rendering
- Preserve: existing 'unknown character: <id>' messages for speakers and say events
- Preserve: loadWorld behavior


## Technical constraints
- Errors stay plain strings returned from validateWorld(world): string[]


## Definition of done
- Unknown scene character ids are reported
- Unit tests pass


## Clarifying questions
- None
