---
id: "01M8447V97RWSJW7Z6MJR1832Q"
kind: unit
parent: 01M8447V96YWCV4FP05DH7JHPE
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Verify: useGame persistence and storage fallback unit tests

Unit tests written from the requirement spec with storage and DOM faked via jsdom; no server or browser is started.

## Acceptance criteria
- Tests fail without the Act and pass with it
- Each test maps to a requirement acceptance criterion


## Scope
- In scope: game/frontend/tests/setup.ts
- In scope: game/frontend/tests/useGame.test.tsx
- Out of scope: Product code
- Preserve: Act code


## Technical constraints
- Vite + React + TypeScript under game/frontend/
- Reuse game/src runtime via imports; do not copy it


## Definition of done
- Listed tests pass in seconds


## Clarifying questions
- None
