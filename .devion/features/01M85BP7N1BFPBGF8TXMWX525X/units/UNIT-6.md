---
id: "01M85BP7N2JZRD4NTYPN5F17SW"
kind: unit
parent: 01M85BP7N1KYP1XAPXSZBNPXM2
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Verify: App round loading, empty, error and retry unit tests

Mock ./api/client getCurrentRound; no network.

## Acceptance criteria
- Loading and success states are each asserted with getCurrentRound mocked
- Empty (404) and error (500, network) states are each asserted
- Retry after a failure reloads the round and shows it


## Scope
- In scope: New test file appRound.test.tsx
- Out of scope: Phaser
- Preserve: appHeader.test.tsx


## Technical constraints
- Fixture roundFixture mirrors backend world.Round; ApiError constructed from the real class; mock Phaser-dependent children as in tests/appHeader.test.tsx


## Definition of done
- Tests pass


## Clarifying questions
- None
