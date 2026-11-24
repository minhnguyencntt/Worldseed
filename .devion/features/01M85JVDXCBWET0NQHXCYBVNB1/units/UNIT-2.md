---
id: "01M85JVDXDN7JGAS8JKPJF09Q4"
kind: unit
parent: 01M85JVDXDWHNRBZJEBP0J7DG1
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Act: Clear non-matching focus and call applyFocusedObject from onStateChange

Extend applyFocusedObject to blur focused objects that do not match (all of them when id is null) and call it from onStateChange with useGameStore.getState().focusedObjectId before the null-state early return.

## Acceptance criteria
- With focusedObjectId null, focused objects get blur() on store change
- Focus application still runs when GameState is null


## Scope
- In scope: applyFocusedObject blur branch
- In scope: onStateChange wiring
- Out of scope: Tests
- Out of scope: Keyboard handler
- Preserve: sceneObjects.forEach sync(state) behavior


## Technical constraints
- Read focus from useGameStore.getState().focusedObjectId; do not copy it into a scene field
- Code path: `game/frontend/src/phaser/BootScene.ts`


## Dependencies
- REQ-2
- ACT-1


## Definition of done
- Store focus changes drive highlight and clear on null


## Clarifying questions
- None
