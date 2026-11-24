---
id: "01M864WDRCY5SSWC2JJ2T1HVH5"
kind: unit
parent: 01M864WDRB4QWGCZE80TNSHYN3
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Verify: GameLayout centered story dialog unit tests

Write tests/layoutDialog.test.tsx and update tests that assert the aside or Story toggle.

## Acceptance criteria
- No aside and no Story button
- story-dialog contains the story node and the scene node stays mounted


## Scope
- In scope: game/frontend/tests/layoutDialog.test.tsx
- In scope: game/frontend/tests/layout.test.tsx
- In scope: game/frontend/tests/layoutSplit.test.tsx
- In scope: game/frontend/tests/layoutStack.test.tsx
- In scope: game/frontend/tests/layoutDesktop.test.tsx
- In scope: game/frontend/tests/app.test.tsx
- Out of scope: Real browser
- Preserve: Header slot tests


## Technical constraints
- jsdom; no server


## Definition of done
- Tests pass


## Clarifying questions
- None
