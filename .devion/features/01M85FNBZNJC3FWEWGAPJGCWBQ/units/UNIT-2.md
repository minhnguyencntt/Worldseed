---
id: "01M85FNBZNAHJR9DQ6EWGHKMF5"
kind: unit
parent: 01M85FNBZNB86XC44Q1ER45E7J
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Verify: Empty history message unit tests

Write unit tests from the spec with listMine and submitContribution mocked via vi.mock of ../src/api/client, following tests/contributionHistoryStatus.test.tsx.

## Acceptance criteria
- Empty ready state shows the message.
- Adding an entry hides it.
- Loading and error states do not show it.


## Scope
- In scope: game/frontend/tests/contributionHistoryEmpty.test.tsx
- Out of scope: Browser or real API
- Preserve: Existing tests


## Technical constraints
- vitest + @testing-library/react with jsdom; all API calls mocked


## Definition of done
- New tests pass in seconds


## Clarifying questions
- None
