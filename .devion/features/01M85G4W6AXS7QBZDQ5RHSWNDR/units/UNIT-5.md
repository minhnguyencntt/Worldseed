---
id: "01M85G4W6B9BJPFAK7G9MDDX22"
kind: unit
parent: 01M85G4W6AGE79PKNJMDJ75AJA
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Verify: Success feedback targets its own test id unit tests

Replace ambiguous role queries with test id queries in the success feedback test.

## Acceptance criteria
- Success test uses contribution-success
- 429 and edit tests assert it is absent


## Scope
- In scope: tests/contributionSuccessFeedback.test.tsx
- Out of scope: Product code
- Preserve: Alert assertions


## Technical constraints
- Mock submitContribution and listMine


## Definition of done
- Test passes


## Clarifying questions
- None
