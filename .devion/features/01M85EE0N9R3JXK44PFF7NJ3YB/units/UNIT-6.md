---
id: "01M85EE0NAG8D02C6BCSD7H5B9"
kind: unit
parent: 01M85EE0N9VPTS685VVFDHSM4D
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Verify: Inline success and error feedback unit tests

New test file with mocked submitContribution; error case uses ApiError from the real client module via importOriginal.

## Acceptance criteria
- After a resolved send a role=status 'Suggestion sent' shows and no alert is present.
- After a 429 the slow-down alert shows with no success message, and typing clears the success message.


## Scope
- In scope: tests/contributionSuccessFeedback.test.tsx
- Out of scope: Product code


## Technical constraints
- Mock ../src/api/client; construct ApiError as tests/contribution.test.tsx does for the 429 case


## Dependencies
- ACT-3


## Definition of done
- Feedback tests pass


## Clarifying questions
- None
