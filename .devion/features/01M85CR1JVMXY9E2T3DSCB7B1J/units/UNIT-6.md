---
id: "01M85CR1JW79WVHR8DSTZN4FQH"
kind: unit
parent: 01M85CR1JV1RX5ZN20AB0RTGVW
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Verify: Zero-quota gating unit tests

Prove submit is blocked at 0 remaining and allowed at 1 remaining, using a mocked history response.

## Acceptance criteria
- 5 sent entries disable Send and show the message
- 4 sent entries keep Send enabled


## Scope
- In scope: Test file
- Out of scope: Product code
- Preserve: Existing tests


## Technical constraints
- History fixture built from contributionFixture in tests/fixtures/api.ts, matching the listMine response (Contribution[] from GET player/me/contributions in src/api/client.ts)


## Definition of done
- Tests pass


## Clarifying questions
- None
