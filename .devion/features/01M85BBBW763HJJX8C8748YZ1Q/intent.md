---
id: "01M85BBBW763HJJX8C8748YZ1Q"
kind: intent
parent: null
status: draft
links: []
agent: null
source: llm
evidence: {"project_id":"944dfe9c-3760-4ab1-81a3-865a561626d8"}
---
# SG-6.2 Second NPC scene unit tests with mocked dependencies

Context: characterSchema, validateWorld scene character checks, resolveCharacterAnimation and BootScene.createCharacter already exist, but the only tested character is the boy. Desired behavior: unit tests with every dependency mocked load a scene containing a second NPC from data. Expected result: tests prove it validates, is spawned, resolves its idle animation from the manifest, and that an unknown NPC reference is rejected. Why: guards data-driven NPC support.

## Acceptance criteria
- Given a scene with a second NPC whose id is in the world list, when sceneSchema and validateWorld run, then both accept it with no errors
- Given a loaded scene with boy and a second NPC, when BootScene.create runs, then two character sprites are created and each plays its own idle animation key
- Given the NPC idle ref points to a manifest asset, when resolveCharacterAnimation runs, then it returns that asset and animation
- Given a scene NPC id absent from world.characters, when validateWorld runs, then it returns a path-tagged unknown character error


## Scope
- In scope: New unit tests for the second NPC
- In scope: Minimal product exports the tests need
- Out of scope: New artwork or manifest assets
- Out of scope: Backend changes
- Out of scope: Browser or e2e checks
- Preserve: Existing character tests
- Preserve: Existing the-boys-room content


## Technical constraints
- Vitest only
- Phaser, fs and content mocked or in-memory


## Definition of done
- All requirement tickets have passing Verify units


## Non-functional requirements
- Each test file runs in seconds


## Clarifying questions
- None
