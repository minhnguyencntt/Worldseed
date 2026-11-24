---
id: "01M85BP7N2F3NCV7NEF63760Y1"
kind: unit
parent: 01M85BP7N1HNKB5EKJA6GTBFFB
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Act: Add onRetry and Retry button to HeaderOverlay error state

Extend HeaderOverlayProps with onRetry and render the button in the error branch. Product code only.

## Acceptance criteria
- Retry button is rendered only when error is set and onRetry is provided
- Clicking calls onRetry


## Scope
- In scope: HeaderOverlay.tsx
- Out of scope: App wiring
- Preserve: Existing alert text prefix 'Round unavailable: '


## Technical constraints
- Code path: `game/frontend/src/components/HeaderOverlay.tsx`


## Definition of done
- Component compiles


## Clarifying questions
- None
