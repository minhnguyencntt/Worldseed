---
id: "01M85Z6HPBK4R3CVWV5SC2HRFM"
kind: requirement
parent: 01M85Z6HPB3EZNCVMBB2CEW7YV
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# REQ · Hover or focus shows a content-driven name plate and action buttons through the existing flow

Context: objectHover is typed in events.ts but never emitted; SceneObject.onHover only toggles highlight and the Phaser label; ActionMenu is shown only after a click and is not anchored. Desired: BootScene emits objectHover on pointer over/out, an ObjectOverlay component reads the active id (hover or store focusedObjectId), looks the object up in game.view (already filtered by action conditions), and renders a plate with the name upper-cased and a button per action label, positioned by anchorFor. Clicking a button calls game.act(objectId, actionId). Hand cursor is kept on interactive objects. Expected result: the reference-style name plate and INSPECT / SEARCH / PUSH buttons. Why: Done-when 3.8.

## Acceptance criteria
- Given the bookshelf is hovered, When the overlay renders, Then a plate reads the content name upper-cased and one button per available action appears with its content label
- Given a button is clicked, When the handler runs, Then game.act is called with that object id and action id
- Given the pointer leaves the object and nothing is focused, When objectHover emits null, Then the overlay disappears
- Given the interactive image, When created, Then useHandCursor is set for objects with and without bounds


## Scope
- In scope: objectHover emission
- In scope: ObjectOverlay component
- In scope: Replacing ActionMenu in App
- In scope: Hand cursor on bounded objects
- Out of scope: Changing action content
- Out of scope: Restyling Phaser text label
- Preserve: objectClick event
- Preserve: game.act and useGame view filtering


## Technical constraints
- Labels and actions come from the object's content definition only
- Use existing Frame kit and palette tokens
- React, Tailwind, Zustand stay


## Dependencies
- REQ1


## Definition of done
- ObjectOverlay replaces ActionMenu in App
- ActionMenu.tsx removed


## Non-functional requirements
- Buttons use the shared four-state Button styling


## Clarifying questions
- None
