---
id: "01M85Z6HPCZWF5QJSE3F0195C1"
kind: unit
parent: 01M85Z6HPBK4R3CVWV5SC2HRFM
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Act: Emit objectHover and build the anchored ObjectOverlay in App

BootScene emits objectHover on SceneObject hover; new ObjectOverlay component uses anchorFor and game.view; App renders it in place of ActionMenu and passes onLayout.

## Acceptance criteria
- objectHover emits {id} on hover over and {id:null} on out
- ObjectOverlay shows upper-case name and action buttons for the hovered or focused object


## Scope
- In scope: SceneObject.onHover emission hook
- In scope: ObjectOverlay.tsx
- In scope: App wiring
- In scope: hand cursor for bounded objects in renderContext
- Out of scope: Keyboard ARIA work
- Preserve: objectClick flow


## Technical constraints
- Labels from content only
- Palette tokens and Frame kit
- Phaser stays on 3.90.x
- Code path: `game/src/entities/SceneObject.ts`
- Code path: `game/frontend/src/phaser/BootScene.ts`
- Code path: `game/frontend/src/phaser/renderContext.ts`
- New file: `game/frontend/src/components/ObjectOverlay.tsx`
- Code path: `game/frontend/src/App.tsx`


## Dependencies
- ACT1


## Definition of done
- Overlay visible for hover and focus
- game.act called on button click


## Clarifying questions
- None
