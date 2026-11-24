---
id: "01M85K5FC9ZA2M2EAJPAM77MGE"
kind: unit
parent: 01M85K5FC9XME6A0H5TVF8XTJG
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Verify: Null store focus clears scene focus unit tests

TDD unit tests proving that setting focusedObjectId to null removes highlight and label (blur) from focused objects.

## Acceptance criteria
- Null focusedObjectId blurs a focused object
- Null with nothing focused makes no blur call


## Scope
- In scope: game/frontend/tests/bootSceneFocusClear.test.ts
- Out of scope: Real Phaser
- Preserve: Existing bootScene tests


## Technical constraints
- Same vi.mock setup as bootSceneKeyboard.test.ts
- New file: `game/frontend/tests/bootSceneFocusClear.test.ts`


## Dependencies
- ACT2


## Definition of done
- Test file passes


## Clarifying questions
- None
