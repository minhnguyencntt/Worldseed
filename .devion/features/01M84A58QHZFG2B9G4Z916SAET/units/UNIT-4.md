---
id: "01M84A58QJC0F8S2F521V1MHEC"
kind: unit
parent: 01M84A58QJ2GVQ576HZF7ZTC7R
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Verify: World title display unit tests

Test getWorld and AdminApp heading with a url-routing fetch stub.

## Acceptance criteria
- Title appears when world fetch succeeds.
- Fallback WORLD_ID shown when it fails.


## Scope
- In scope: tests/adminWorld.test.tsx
- In scope: tests/fixtures/api.ts
- Out of scope: Product code
- Preserve: Existing fixtures


## Technical constraints
- fetch mocked; no server


## Definition of done
- Tests pass


## Clarifying questions
- None
