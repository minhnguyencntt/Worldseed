---
id: "01M85HVG1W6KAV7VY0MZPYJF8T"
kind: unit
parent: 01M85HVG1VVCBZQ1ZP2GTYRNWY
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Verify: BootScene keyboard unit tests for each key with Phaser mocked

New test file with Phaser mocked so Scene exposes input.keyboard {on, off} spies and events.once; buildScene mocked to return fake objects.

## Acceptance criteria
- Tab, Shift+Tab, ArrowRight, ArrowLeft, Enter, Space and Escape each have a test.
- Shutdown removes the listener.


## Scope
- In scope: game/frontend/tests/bootSceneKeyboard.test.ts
- Out of scope: Product code
- Preserve: Other bootScene tests


## Technical constraints
- Mirror the mocks in game/frontend/tests/bootSceneSync.test.ts; add input.keyboard to the mocked Scene; mock @game/engine/buildScene with buildScene and moveFocus as vi.fn


## Definition of done
- Tests pass


## Clarifying questions
- None
