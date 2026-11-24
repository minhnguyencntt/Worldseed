---
id: "01M859KF8TPYKVYRADGSSD78DA"
kind: unit
parent: 01M859KF8T3YPJQZBJHA3SVZYN
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Verify: Character schema, animation resolver and preload unit tests

Test schema, resolver, planPreload and BootScene with Phaser mocked.

## Acceptance criteria
- Resolver returns manifest animation or idle
- Schema validates characters
- BootScene plays idle then interact with mocked Phaser


## Scope
- In scope: game/tests/characterAnimation.test.ts
- In scope: game/frontend/tests/bootSceneCharacters.test.ts
- Out of scope: Browser runs


## Technical constraints
- Phaser mocked via the @game alias pattern in bootScene.test.ts


## Dependencies
- ACT1


## Definition of done
- Tests green


## Clarifying questions
- None
