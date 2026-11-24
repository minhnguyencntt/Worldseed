---
id: "01M85KP4J96N7Z5KK2DD43H52Z"
kind: unit
parent: 01M85KP4J9EEFQMNPVZ8Y2KSCS
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Act: Extract a single focused-id helper in BootScene

Replace the inline focused-id lookup in onKeyDown with a private focusedObjectIdFromScene method returning string | null.

## Acceptance criteria
- Helper returns null when no object isFocused.
- Store write and event use the helper result.


## Scope
- In scope: BootScene private helper
- Out of scope: applyFocusedObject changes
- Preserve: Public behavior of BootScene


## Technical constraints
- Method must be private
- Code path: `game/frontend/src/phaser/BootScene.ts`


## Dependencies
- ACT1


## Definition of done
- onKeyDown calls the helper once per move


## Clarifying questions
- None
