---
id: "01M85BBBW8E3VP31CSE4MMSDKS"
kind: unit
parent: 01M85BBBW7Z40KS018CZVN1Y9A
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Verify: Second NPC scene parses and validates unit tests

Write game/tests/npcSceneValid.test.ts with in-memory scene and world, no fs.

## Acceptance criteria
- sceneSchema accepts boy plus npc
- validateWorld returns []


## Scope
- In scope: New test file
- Out of scope: Product code
- Preserve: Existing tests


## Technical constraints
- In-memory data


## Definition of done
- Tests pass


## Clarifying questions
- None
