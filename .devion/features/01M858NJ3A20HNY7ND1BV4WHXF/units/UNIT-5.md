---
id: "01M858NJ3B64CZEKG32GJY77GX"
kind: unit
parent: 01M858NJ3AWSRV3YDCD17Q7R56
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Verify: effectContext exhaustive return unit tests

Unit tests with a mocked Phaser scene.

## Acceptance criteria
- Handles returned for 3 effect types
- Throws for unknown effect type


## Scope
- In scope: new test
- Out of scope: product code
- Preserve: bootSceneEffects.test.ts


## Technical constraints
- Mock phaser with vi.mock; fake scene object


## Definition of done
- test passes


## Clarifying questions
- None
