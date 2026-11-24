---
id: "01M85XAD0NCT6A8FXN2CB7P0YD"
kind: requirement
parent: 01M85XAD0M8DK9H6MVEFEFT98C
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# REQ · Frame components apply border-image with pixelated rendering and the Button shows four states on the game screen

Context: Button has default and ghost variants only; header, aside and story panel are unstyled. Desired: Tailwind components .sf-frame-* and .sf-btn from FRAME_KIT using border-image and image-rendering: pixelated, a Frame component, a frame Button variant with normal/hover/pressed/disabled, hand cursor class, applied in HeaderOverlay, GameLayout aside, StoryPanel and the Suggest trigger. Expected: framed UI. Why: matches the reference.

## Acceptance criteria
- Given the generated component CSS, when inspected, then every frame class has borderImage using its PNG path and slice, and imageRendering pixelated
- Given Button variant frame with state normal, hover, pressed or disabled, when rendered, then it has sf-btn and data-state of that value, and disabled sets the disabled attribute
- Given the game screen components, when rendered, then header has sf-frame-bar, aside has sf-frame-panel, dialogue has sf-frame-parchment and inventory items sf-frame-slot


## Scope
- In scope: frameKit plugin
- In scope: Frame component
- In scope: Button variant
- In scope: wiring in HeaderOverlay, GameLayout, StoryPanel, App trigger
- Out of scope: header and story panel rebuild
- Preserve: default and ghost Button variants (bg-primary test)
- Preserve: existing aria labels and roles


## Technical constraints
- Nearest-neighbour: image-rendering pixelated
- React, Tailwind, Radix stay


## Dependencies
- R1
- R3


## Definition of done
- Kit reached from the game screen


## Non-functional requirements
- Buttons keep keyboard focus and aria attributes


## Clarifying questions
- None
