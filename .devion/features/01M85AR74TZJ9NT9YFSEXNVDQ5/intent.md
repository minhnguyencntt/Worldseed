---
id: "01M85AR74TZJ9NT9YFSEXNVDQ5"
kind: intent
parent: null
status: draft
links: []
agent: null
source: llm
evidence: {"project_id":"944dfe9c-3760-4ab1-81a3-865a561626d8"}
---
# SG-6.1.3 Validate scene characters against the world's character list

Context: validateWorld in game/src/content/loader.ts checks dialogue speakers and say events against world.characters, but never checks scene.characters (SceneDef.characters?: CharacterSpec[]). Desired behavior: each scene character id is checked against the world's list and unknown ids are reported as scenes[<sceneId>].characters[<index>].id: unknown character <id>. Expected result: dangling NPC references fail world content validation, and unit tests cover the reject and accept cases. Why: scene NPCs must reference declared world characters.

## Acceptance criteria
- Given a scene character whose id is not in world.characters, when validateWorld runs, then the errors contain scenes[<sceneId>].characters[<index>].id: unknown character <id>
- Given a scene whose characters are all in world.characters, when validateWorld runs, then no character error is reported
- Given the unit tests in game/tests/validator.test.ts, when they run, then the reject and accept cases pass with every dependency mocked


## Scope
- In scope: validateWorld scene character check
- In scope: unit tests in game/tests/validator.test.ts
- Out of scope: characterSchema changes
- Out of scope: BootScene rendering
- Out of scope: dialogue speaker validation changes
- Preserve: existing unknown character message format for dialogue speakers and say events
- Preserve: existing validator tests


## Technical constraints
- Reuse the existing characters Set in validateWorld
- Do not change the error strings that already exist


## Definition of done
- Unknown scene character ids are reported with the path-tagged message
- Unit tests pass


## Clarifying questions
- None
