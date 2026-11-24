---
id: "01M85YC1TJ6JDZGZKW9ZVS3MPY"
kind: unit
parent: 01M85YC1TJABW5F2PBKNKSP3GZ
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Act: Render the framed event log and confirm App wiring

Rebuild the history section in StoryPanel and verify App passes real state.

## Acceptance criteria
- Log has sf-frame-plaque and max-h scroll
- Empty message shown
- No legacy stone/amber classes remain


## Scope
- In scope: StoryPanel history section
- In scope: App StoryPanel props
- Out of scope: other components
- Preserve: Story history aria-label


## Technical constraints
- React, Tailwind stay.
- Code path: `game/frontend/src/components/StoryPanel.tsx`
- Code path: `game/frontend/src/App.tsx`


## Dependencies
- REQ3
- ACT2


## Definition of done
- Log renders from history


## Clarifying questions
- None
