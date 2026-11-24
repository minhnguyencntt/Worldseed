---
id: "01M84NQD7DW6T8QVM8GNG5A0JB"
kind: unit
parent: 01M84NQD7C9ASFHTA9BV50NTS6
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Act: Add sound toggle and settings buttons wired to useUiStore

Add the sound and settings controls to the HeaderOverlay header.

## Acceptance criteria
- Sound button calls toggleSound
- Settings button calls toggleSettings


## Scope
- In scope: Buttons in HeaderOverlay.tsx
- Out of scope: Tests
- Out of scope: Settings panel
- Preserve: uiStore.ts


## Technical constraints
- Button from ./ui/button, icons from lucide-react
- New file: `game/frontend/src/components/HeaderOverlay.tsx`


## Dependencies
- ACT1


## Definition of done
- Buttons render with aria-labels


## Non-functional requirements
- Accessible labels


## Clarifying questions
- None
