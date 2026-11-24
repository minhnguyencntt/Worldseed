---
id: "01M84X7J08DMVCB4E6N6CAMSG3"
kind: requirement
parent: 01M84X7J07NASDFQQ1R4CJ9K97
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# REQ · SceneObject renders bounds, hover highlight, name label and emits click

Context: RenderHandle only has setVisible and destroy. Desired behavior: createSprite receives the object name and interaction bounds; the handle exposes setHighlighted, setLabelVisible, onHover and onClick. SceneObject toggles highlight and label on hover and emits an interact event on click, only when visible. Expected result: pointer interaction is data-driven with no Phaser in the entity. Why: hover and click identify and trigger interactive objects.

## Acceptance criteria
- Given a spec with a name and bounds, When constructed, Then createSprite receives label equal to spec.name and the computed bounds
- Given hover enters then leaves, When callbacks fire, Then setHighlighted and setLabelVisible receive true then false
- Given a visible object is clicked, When onClick fires, Then the interact listener receives the object id and availableActions for the state
- Given the object is hidden by visibleWhen, When clicked or hovered, Then no event is emitted and no highlight shows


## Scope
- In scope: renderContext.ts interfaces
- In scope: SceneObject hover/click/onInteract
- Out of scope: Phaser implementation of RenderContext
- Preserve: Existing createSprite fields key,x,y,scale,depth
- Preserve: visibleWhen sync


## Technical constraints
- Reuse availableActions and pointInBounds from systems/interaction.ts


## Dependencies
- REQ1


## Definition of done
- Interfaces and entity updated


## Clarifying questions
- None
