---
id: "01M85E1KCJ8QXX5NXE6AYKZA9N"
kind: requirement
parent: 01M85E1KCJZRHFJXAQ5R9302M5
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# REQ · Zero-quota tests assert disabled Send, message and blocked submit

Context: when listMine returns MAX_PER_PLAYER entries, remaining is 0, Send is disabled and a quota alert shows. Expected result: tests fail if the disabled attribute, message or handleSubmit guard is removed.

## Acceptance criteria
- Given 5 sent suggestions, then Send is disabled and the alert reads 'You have used all your suggestions this round'
- Given zero quota, when the form is submitted directly, then submitContribution has 0 calls


## Scope
- In scope: Quota gating assertions
- Out of scope: Blank and length behaviour
- Preserve: Contributions left text


## Technical constraints
- Quota history comes from the mocked listMine using contributionFixture


## Definition of done
- Quota tests pass and fail without the guards


## Clarifying questions
- None
