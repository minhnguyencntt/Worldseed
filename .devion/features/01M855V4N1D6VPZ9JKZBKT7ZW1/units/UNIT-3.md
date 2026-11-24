---
id: "01M855V4N12KWH7KDWYB22EJJK"
kind: unit
parent: 01M855V4N1JCEQFQZBX1GTRH62
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Verify: BootScene.preload loads only planned assets

Test BootScene.preload with mocked Phaser load and mocked content.

## Acceptance criteria
- only planned ids queued
- unknown ids warned


## Scope
- In scope: frontend/tests/bootScenePreload.test.ts
- Out of scope: browser


## Technical constraints
- Mock phaser and ../src/runtime/content


## Definition of done
- tests pass


## Clarifying questions
- None
