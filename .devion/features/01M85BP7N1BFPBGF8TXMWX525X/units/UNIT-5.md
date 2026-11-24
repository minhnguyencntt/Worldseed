---
id: "01M85BP7N24T9QWJ03PSGJH9G9"
kind: unit
parent: 01M85BP7N1HNKB5EKJA6GTBFFB
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Verify: HeaderOverlay Retry and success state unit tests

Tests render HeaderOverlay with fixtures only.

## Acceptance criteria
- Retry click calls onRetry
- No Retry without error
- Success state shows round id, status and timer


## Scope
- In scope: New test file headerRetry.test.tsx
- Out of scope: Network
- Preserve: headerOverlayStates.test.tsx


## Technical constraints
- Use roundFixture from tests/fixtures/api.ts, which mirrors backend world.Round JSON


## Definition of done
- Tests pass


## Clarifying questions
- None
