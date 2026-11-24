---
id: "01M85DHGKTD3RWYBTYK2WNA4HC"
kind: unit
parent: 01M85DHGKS1JD7SGNJ3S8TYG2E
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Verify: Zero-quota Send disabled and submit blocked unit tests

Write unit tests from REQ2 with mocked client.

## Acceptance criteria
- Send disabled at 0 remaining
- submitContribution not called on form submit at 0 remaining
- submit works with 1 remaining


## Scope
- In scope: Tests in contributionQuota.test.tsx
- Out of scope: Product code
- Preserve: Existing tests


## Technical constraints
- Same mocks as VER1; fixtures from tests/fixtures/api.ts


## Definition of done
- Tests pass


## Clarifying questions
- None
