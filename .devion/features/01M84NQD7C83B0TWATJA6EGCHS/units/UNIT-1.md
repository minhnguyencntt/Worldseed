---
id: "01M84NQD7DPJM0JCQCWJVKQYEZ"
kind: unit
parent: 01M84NQD7CDHXHPV5GY817J491
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Act: Create HeaderOverlay with logo, world, round ID, status and countdown

Create the HeaderOverlay component with props and the ready-state layout.

## Acceptance criteria
- HeaderOverlay exported with props worldTitle, round, loading, error
- Ready state shows logo, title, id, status and Countdown


## Scope
- In scope: New HeaderOverlay.tsx
- Out of scope: Tests
- Out of scope: Store controls
- Preserve: Countdown.tsx


## Technical constraints
- Tailwind classes
- New file: `game/frontend/src/components/HeaderOverlay.tsx`


## Definition of done
- Component compiles with tsc --noEmit


## Clarifying questions
- None
