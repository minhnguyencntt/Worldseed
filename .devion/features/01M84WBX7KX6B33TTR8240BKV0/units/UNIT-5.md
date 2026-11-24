---
id: "01M84WBX7KVSVN9NZX97PKG7NE"
kind: unit
parent: 01M84WBX7KGVHZY4TTYKTH2VA1
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Verify: Layer ordering and content-to-entity creation unit tests

Unit tests with a fake RenderContext and a mocked Phaser module cover layer depth ordering, content to entity creation and visibility filtering.

## Acceptance criteria
- Depth order test passes for all six layers
- Position, scale and visibility cases pass


## Scope
- In scope: game/tests/layers.test.ts
- In scope: game/tests/buildScene.test.ts
- In scope: game/frontend/tests/worldScene.test.ts
- Out of scope: product code


## Technical constraints
- Phaser mocked via vi.mock('phaser'); fake RenderContext records calls


## Definition of done
- Tests green


## Clarifying questions
- None
