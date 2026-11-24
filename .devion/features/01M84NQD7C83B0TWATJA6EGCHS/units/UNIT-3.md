---
id: "01M84NQD7DJ4T51YDQ7YDXRN0S"
kind: unit
parent: 01M84NQD7D7TG8EXHE6B67FE8K
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Act: Add loading, empty and error states to HeaderOverlay

Replace the round block in HeaderOverlay with a state switch.

## Acceptance criteria
- error > loading > empty precedence
- Error text includes the explanation


## Scope
- In scope: State branches in HeaderOverlay.tsx
- Out of scope: Tests
- Out of scope: Fetching
- Preserve: Logo and controls always rendered


## Technical constraints
- role=alert on error
- New file: `game/frontend/src/components/HeaderOverlay.tsx`


## Dependencies
- ACT1


## Definition of done
- Three states render distinct text


## Clarifying questions
- None
