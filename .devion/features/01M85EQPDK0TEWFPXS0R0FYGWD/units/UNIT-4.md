---
id: "01M85EQPDMJJ18TX6CS5BVQHQF"
kind: unit
parent: 01M85EQPDKABP1DT0AEX9BHXMP
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Verify: History loading state and derived remaining unit tests

Test the loading state and that remaining is derived from history with listMine mocked.

## Acceptance criteria
- Loading text asserted while listMine is pending
- Remaining count asserted after resolve with 2 items


## Scope
- In scope: New test file
- Out of scope: Product code
- Preserve: Existing tests


## Technical constraints
- Mock listMine with vi.mock of ../src/api/client as in contributionSuccessFeedback.test.tsx


## Definition of done
- Tests pass


## Clarifying questions
- None
