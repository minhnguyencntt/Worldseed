---
id: "01M864WDRB4QWGCZE80TNSHYN3"
kind: requirement
parent: 01M864WDRAHXDD9GJVE8TV688V
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# REQ · Gameplay scene fills the viewport and story text sits in a centered dialog

Context: GameLayout.tsx uses grid-cols md:[3fr_1fr] with an aside drawer and Story toggle button. Desired behavior: the scene main fills the viewport and the story prop renders inside a centered dialog overlay. Expected result: text appears centered over a full-screen scene. Why: the requested indie-game look.

## Acceptance criteria
- Given GameLayout renders scene, header and story, when inspected, then no aside element exists and the main scene container has class h-screen w-full.
- Given GameLayout renders, when inspected, then the story node is inside an element with data-testid story-dialog and class sf-dialog that is centered and the scene stays mounted.


## Scope
- In scope: GameLayout structure and classes
- In scope: Removing the sidebar and drawer toggle from GameLayout
- In scope: Updating obsolete layout tests
- Out of scope: uiStore drawer fields
- Out of scope: Phaser sizing logic
- Preserve: header, scene and story props
- Preserve: PhaserHost fills its container
- Preserve: HeaderOverlay position


## Technical constraints
- The dialog wrapper must be pointer-events-none with a pointer-events-auto dialog so scene objects stay clickable
- Scene stays rendered by App through the scene prop


## Dependencies
- R2


## Definition of done
- Sidebar path removed and dialog layout unit tests pass


## Non-functional requirements
- Dialog max height 60vh and scrolls internally


## Clarifying questions
- None
