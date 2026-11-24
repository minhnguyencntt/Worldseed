---
id: "01M85Z6HPCWRP0DF802YK6FCQB"
kind: unit
parent: 01M85Z6HPB18DCCYJF9H3DN26C
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Act: Add keyboard focus flow, ARIA labels and live region to ObjectOverlay

ObjectOverlay renders a role=group region with aria-label, per-button aria-label, an aria-live polite region from focusedObjectId, and moves focus to the first action on Enter for a focused object.

## Acceptance criteria
- Live region text derives from store focus and content
- Buttons carry combined aria-labels
- Escape emits menuClose


## Scope
- In scope: ObjectOverlay a11y
- In scope: Escape handling
- Out of scope: BootScene key mapping changes
- Preserve: focusChange and menuClose events


## Technical constraints
- Labels from the same game state
- Radix and Tailwind stay
- New file: `game/frontend/src/components/ObjectOverlay.tsx`
- Code path: `game/frontend/src/App.tsx`


## Dependencies
- ACT2


## Definition of done
- Live region present while focus is set


## Non-functional requirements
- aria-live polite


## Clarifying questions
- None
