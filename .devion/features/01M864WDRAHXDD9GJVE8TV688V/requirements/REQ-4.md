---
id: "01M864WDRBFXBBSH60F5SZSEK2"
kind: requirement
parent: 01M864WDRAHXDD9GJVE8TV688V
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# REQ · StoryPanel is dialog content with larger readable text

Context: StoryPanel.tsx root is sf-frame-panel h-full text-sm sized for a narrow sidebar, with bare h1/h2 and small text. Desired behavior: content sized for a centered dialog: sf-dialog body text, speaker in pixel font, choices as full-width gold buttons. Expected result: dialogue is easy to read. Why: readability.

## Acceptance criteria
- Given StoryPanel renders a node, when inspected, then the root keeps class story-content and has no h-full or text-sm class.
- Given a node with two choices, when rendered, then each choice button has class w-full and the speaker heading has class font-pixel.


## Scope
- In scope: StoryPanel classes and markup
- Out of scope: Dialogue logic
- Out of scope: Inventory slot data
- Preserve: aria-labels Dialogue, Choices, Event log, Story history, Inventory
- Preserve: Portrait image
- Preserve: onChoose behavior


## Technical constraints
- Keep the story-content root class (asserted by existing tests)


## Dependencies
- R3


## Definition of done
- StoryPanel readable classes applied and unit tests pass


## Non-functional requirements
- Text size at least 16px


## Clarifying questions
- None
