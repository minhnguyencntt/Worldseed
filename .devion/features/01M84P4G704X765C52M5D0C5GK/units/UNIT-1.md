---
id: "01M84P4G70YTQS0A7KREGGGMHX"
kind: unit
parent: 01M84P4G701J0B8RRNWVMSWT2J
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Act: Add header slot prop to GameLayout

Edit GameLayout to accept header?: ReactNode and render it before scene inside the main element.

## Acceptance criteria
- Header node renders inside main when provided
- Layout unchanged when header is omitted


## Scope
- In scope: GameLayout.tsx
- Out of scope: Tests
- Preserve: Grid and drawer


## Technical constraints
- Code path: `game/frontend/src/components/GameLayout.tsx`


## Definition of done
- GameLayout accepts and renders header


## Clarifying questions
- None
