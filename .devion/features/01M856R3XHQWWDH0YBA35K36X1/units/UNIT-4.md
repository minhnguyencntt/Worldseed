---
id: "01M856R3XJJ0KJRCBJ1RTF5VWR"
kind: unit
parent: 01M856R3XH7SN8M84Z5SEAY00K
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Verify: Phaser render context unit tests

Test createSprite and the handle against a fake scene object, no real Phaser or canvas.

## Acceptance criteria
- Image created with spec values and resolved key
- Interactive bounds, highlight, label and destroy behave as specified


## Scope
- In scope: New test file
- Out of scope: Product code
- Preserve: Existing tests


## Technical constraints
- Mock 'phaser' with vi.mock; fake scene.add.image and scene.add.text return stub objects


## Dependencies
- A1


## Definition of done
- Tests pass


## Clarifying questions
- None
