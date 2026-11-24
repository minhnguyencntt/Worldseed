---
id: "01M85J8EHFSEHN1BF2P50CZT81"
kind: unit
parent: 01M85J8EHES1NR6R744G0FE74Y
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Act: Apply store focus to SceneObjects and write it from the keyboard handler

BootScene reads focusedObjectId on every store change and focuses the matching SceneObject, blurring the others. The Tab/arrow branch of onKeyDown stores the focused id.

## Acceptance criteria
- Matching object focused, others blurred
- Keyboard focus writes the store


## Scope
- In scope: game/frontend/src/phaser/BootScene.ts
- Out of scope: shutdown
- Preserve: focusChange emission
- Preserve: sync loop


## Technical constraints
- Use SceneObject.focus, blur and isFocused
- Code path: `game/frontend/src/phaser/BootScene.ts`


## Dependencies
- ACT-1


## Definition of done
- Store focus drives highlight; tsc passes


## Clarifying questions
- None
