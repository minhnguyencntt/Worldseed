---
id: "01M85E1KCJXJ048HHNS6WF0J5M"
kind: requirement
parent: 01M85E1KCJZRHFJXAQ5R9302M5
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# REQ · Blank-text tests assert inline message and no submit call

Context: handleSubmit sets validation 'Enter an idea first' and returns before submitContribution. Desired behavior: tests assert the alert text, aria-invalid, aria-describedby and zero submit calls. Expected result: removing the blank guard fails these tests. Why: proves blank text cannot be submitted.

## Acceptance criteria
- Given empty or whitespace text, when Send is clicked, then role=alert text equals 'Enter an idea first' and submitContribution has 0 calls
- Given the message is shown, when the user types, then the alert disappears and aria-invalid is no longer true


## Scope
- In scope: Blank-text assertions
- Out of scope: Length and quota behaviour
- Preserve: BLANK_MESSAGE text


## Technical constraints
- Component source must not be mocked


## Definition of done
- Blank tests pass and fail without the blank guard


## Clarifying questions
- None
