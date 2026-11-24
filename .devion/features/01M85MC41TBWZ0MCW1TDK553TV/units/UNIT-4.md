---
id: "01M85MC41V2GAVPGRADF2ZBT6F"
kind: unit
parent: 01M85MC41T37W8R2SXQ896KXFM
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Verify: playAnimation unsubscribe on shutdown unit tests

Run the captured SHUTDOWN callback and assert later events are ignored.

## Acceptance criteria
- Handler is removed after shutdown
- play not called after shutdown


## Scope
- In scope: game/frontend/tests/bootScenePlayAnimationShutdown.test.ts
- Out of scope: Real Phaser
- Preserve: Existing tests


## Technical constraints
- Same mocks as bootSceneCharacters.test.ts


## Dependencies
- ACT2


## Definition of done
- Tests pass


## Clarifying questions
- None
