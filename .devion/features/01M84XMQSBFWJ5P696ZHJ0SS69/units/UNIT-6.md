---
id: "01M84XMQSC2R68PCHQZ3CGZPDR"
kind: unit
parent: 01M84XMQSBC9F758DGDT9XWBR4
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Verify: BootScene effect wiring and Phaser context unit tests

Mock phaser and ../src/engine/buildEffects.

## Acceptance criteria
- BootScene wiring and shutdown cleanup are asserted
- Phaser context fade and ambient light creation are asserted


## Scope
- In scope: game/frontend/tests/bootSceneEffects.test.ts
- Out of scope: real canvas
- Preserve: bootScene.test.ts


## Technical constraints
- Phaser fully mocked


## Definition of done
- Tests pass


## Clarifying questions
- None
