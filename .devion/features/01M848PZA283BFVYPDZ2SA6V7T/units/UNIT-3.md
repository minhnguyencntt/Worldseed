---
id: "01M848PZA3BC7FVVWGMYZJ121Q"
kind: unit
parent: 01M848PZA2Z6EKGSW7PKNG9GSK
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Act: Wire execution actions in AdminApp

Add runExecutionAction in AdminApp that calls the client, reloads, and reports errors.

## Acceptance criteria
- Success increments reloads
- 401 shows the gate; other errors show an alert


## Scope
- In scope: AdminApp.tsx
- Out of scope: Tests
- Preserve: runRoundAction


## Technical constraints
- Reuse handleError
- Code path: `game/frontend/src/components/AdminApp.tsx`


## Dependencies
- A1
- A2


## Definition of done
- Handlers wired


## Clarifying questions
- None
