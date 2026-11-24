---
id: "01M85BBBW8E5VF73RTQ19BMNRR"
kind: unit
parent: 01M85BBBW7MHDY0A99SKS4ZKYC
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Verify: Second NPC spawn and idle animation unit tests

Write game/tests/npcIdle.test.ts for the resolver and game/frontend/tests/bootSceneNpc.test.ts for spawn, mocking Phaser and content like bootSceneCharacters.test.ts.

## Acceptance criteria
- Resolver returns character:npc idle
- BootScene creates two sprites and NPC plays character:npc:idle


## Scope
- In scope: Two new test files
- Out of scope: Product code
- Preserve: Existing tests


## Technical constraints
- vi.mock phaser and ../src/runtime/content


## Definition of done
- Tests pass


## Clarifying questions
- None
