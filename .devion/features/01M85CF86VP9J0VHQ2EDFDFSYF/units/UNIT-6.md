---
id: "01M85CF86WH475MJEMCJJDDHJ3"
kind: unit
parent: 01M85CF86V7QNKE69RG9R7WE5D
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Verify: Focus returns to the trigger unit tests

Unit tests that App returns focus to the trigger after Escape and Close.

## Acceptance criteria
- Given the sheet was opened from the trigger, when Escape is pressed, then the trigger has focus
- Given the sheet was opened from the trigger, when Close is clicked, then the trigger has focus


## Scope
- In scope: tests/appContributionFocus.test.tsx
- Out of scope: Product code


## Technical constraints
- Mock ../src/api/client getCurrentRound and listMine with vi.mock importOriginal as in tests/appRound.test.tsx; round data from roundFixture in tests/fixtures/api.ts, mirroring the backend current-round response


## Definition of done
- Test file passes


## Clarifying questions
- None
