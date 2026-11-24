---
id: "01M864WDRBH6JYEAPMDCA073TN"
kind: unit
parent: 01M864WDRBFXBBSH60F5SZSEK2
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Act: Resize StoryPanel for the centered dialog

Change StoryPanel root and controls: drop the panel frame, h-full and text-sm; use font-pixel speaker headings and w-full gold choices.

## Acceptance criteria
- Root keeps story-content without h-full/text-sm
- Choice buttons are w-full


## Scope
- In scope: game/frontend/src/components/StoryPanel.tsx
- Out of scope: Dialogue logic
- Preserve: aria-labels
- Preserve: story-content class


## Technical constraints
- Keep the Dialogue, Choices, Event log, Story history and Inventory aria-labels
- Code path: `game/frontend/src/components/StoryPanel.tsx`


## Dependencies
- A3


## Definition of done
- Classes applied


## Clarifying questions
- None
