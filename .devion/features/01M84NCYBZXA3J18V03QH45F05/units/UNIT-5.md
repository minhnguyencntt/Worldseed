---
id: "01M84NCYC0BNQ9HVE61H6AX2Y5"
kind: unit
parent: 01M84NCYC0SVJ8A3YESZ5TT9S0
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Verify: App header round states unit tests

Add tests/appHeader.test.tsx with getCurrentRound mocked.

## Acceptance criteria
- Ready state asserts round id and status are shown
- Pending state asserts 'Loading round…' is shown
- Rejected state asserts an alert with 'Round status unavailable: HTTP 500' and no 'Round unavailable' text


## Scope
- In scope: tests/appHeader.test.tsx


## Technical constraints
- vi.mock('../src/api/client') following the pattern in tests/appFlow.test.tsx; payload from roundFixture in tests/fixtures/api.ts (mirrors backend world.Round JSON); no hard-coded payloads


## Definition of done
- Tests pass


## Clarifying questions
- None
