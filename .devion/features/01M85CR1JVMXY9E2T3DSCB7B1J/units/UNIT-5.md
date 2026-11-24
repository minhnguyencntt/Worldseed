---
id: "01M85CR1JW3XTV6FJ9ER5GQS84"
kind: unit
parent: 01M85CR1JVKS7A94PP3ZPJ1BV7
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Verify: Max length counter and over-limit unit tests

Prove the counter, the over-limit message and the boundary at exactly 500 characters.

## Acceptance criteria
- Counter shows N/500
- 501 chars blocks, 500 chars allows


## Scope
- In scope: Test file
- Out of scope: Product code
- Preserve: Existing tests


## Technical constraints
- fetch stubbed; fixtures from tests/fixtures/api.ts mirroring Contribution in src/api/client.ts


## Definition of done
- Tests pass


## Clarifying questions
- None
