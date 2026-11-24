---
id: "01M84NXPJPEEM6QX4JNDAP1HNM"
kind: unit
parent: 01M84NXPJNW52Z4PC4EX1P2GPC
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Verify: App header round states unit tests

Mock api client and assert header states.

## Acceptance criteria
- Loaded, loading and error states asserted.
- World title shown in the header is asserted.


## Scope
- In scope: tests/appHeader.test.tsx
- Out of scope: Product code
- Preserve: Existing app tests


## Technical constraints
- vi.mock('../src/api/client') for getCurrentRound; fixture shape matches Round in game/frontend/src/api/client.ts (served by backend GET /api/v1/worlds/{id}/round/current)


## Definition of done
- Tests pass


## Clarifying questions
- None
