---
id: "01M85J8EHFFR85MQK0HZBR9B8N"
kind: unit
parent: 01M85J8EHES1NR6R744G0FE74Y
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Verify: store focus drives scene highlight unit tests

Mock phaser, content and buildScene as in bootSceneKeyboard.test.ts. Fakes expose focus, blur, sync, destroy, onInteract, handleKey, isFocused, spec. Update existing bootScene* test fakes that lack focus and blur if they now fail.

## Acceptance criteria
- Store change focuses matching object
- Null id blurs
- Tab writes store


## Scope
- In scope: game/frontend/tests/bootSceneFocusSync.test.ts
- Out of scope: real Phaser
- Preserve: bootSceneKeyboard.test.ts assertions


## Technical constraints
- Same vi.mock set as bootSceneKeyboard.test.ts


## Definition of done
- Tests pass


## Clarifying questions
- None
