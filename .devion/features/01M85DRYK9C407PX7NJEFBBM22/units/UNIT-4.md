---
id: "01M85DRYKAZMCM5HMAWV3P9VZG"
kind: unit
parent: 01M85DRYK94XS9EKM0FX1X39SE
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Verify: Zero-quota Send disabled and submit blocked unit tests

Write tests with the backend mocked proving Send is disabled and submitContribution is never called at zero quota, and still called above 0.

## Acceptance criteria
- Send is disabled at remaining 0
- fireEvent.submit at 0 does not call submitContribution
- Submit above 0 calls submitContribution once


## Scope
- In scope: New test file for zero-quota gating
- Out of scope: Product code changes
- Preserve: Existing contribution tests


## Technical constraints
- Mock ../src/api/client; no real network


## Dependencies
- ACT-2


## Definition of done
- Tests pass


## Clarifying questions
- None
