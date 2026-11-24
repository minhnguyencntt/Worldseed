---
id: "01M85KP4J9QBHH37ZXRX2NDNT6"
kind: unit
parent: 01M85KP4J9NMDZZQ92VNPTYFRG
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Act: Write store focus from BootScene.onKeyDown

In BootScene.onKeyDown, after moveFocus, write the focused id to useGameStore via setFocusedObject, before emitting focusChange.

## Acceptance criteria
- Tab press leaves store focusedObjectId equal to the focused object id.
- focusChange is still emitted.


## Scope
- In scope: BootScene.onKeyDown
- Out of scope: Other handlers
- Preserve: Enter/Space/Escape branches


## Technical constraints
- useGameStore already imported in BootScene.ts
- Code path: `game/frontend/src/phaser/BootScene.ts`


## Definition of done
- onKeyDown writes store focus on Tab, Shift+Tab, arrows


## Clarifying questions
- None
