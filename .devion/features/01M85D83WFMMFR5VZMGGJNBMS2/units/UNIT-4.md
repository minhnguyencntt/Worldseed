---
id: "01M85D83WGQMWZPXY3KNEQMCX8"
kind: unit
parent: 01M85D83WG7166BAHAHVAFVP7Z
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Verify: Over-limit message and submit block unit tests

Extend the max-length test file with over-limit cases using the mocked client.

## Acceptance criteria
- 501 chars shows message and blocks submit
- 500 chars submits


## Scope
- In scope: Test file
- Out of scope: Product code
- Preserve: Blank tests stay green


## Technical constraints
- Mock the client; no network


## Dependencies
- ACT2


## Definition of done
- Tests pass


## Clarifying questions
- None
