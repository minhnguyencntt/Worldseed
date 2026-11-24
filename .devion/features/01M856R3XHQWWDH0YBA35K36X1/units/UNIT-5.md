---
id: "01M856R3XJF4Y0RGY99BWE55EK"
kind: unit
parent: 01M856R3XHF1HXW7QZM0KR0W2H
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Verify: BootScene builds objects from content with none hardcoded

Mock buildScene and the render context; assert BootScene wiring and scan source text for hardcoded ids.

## Acceptance criteria
- buildScene called once with sceneSpec
- Shutdown destroys objects
- No object or asset id literal in BootScene.ts or renderContext.ts


## Scope
- In scope: New test file
- Out of scope: Product code
- Preserve: bootSceneEffects.test.ts


## Technical constraints
- Same phaser mock pattern as frontend/tests/bootSceneEffects.test.ts; fs read only of two source files


## Dependencies
- A2


## Definition of done
- Tests pass


## Clarifying questions
- None
