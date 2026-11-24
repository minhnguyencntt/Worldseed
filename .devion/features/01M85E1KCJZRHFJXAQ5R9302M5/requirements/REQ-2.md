---
id: "01M85E1KCJGH7AVDK6E88CAQKM"
kind: requirement
parent: 01M85E1KCJZRHFJXAQ5R9302M5
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# REQ · Max-length tests assert counter text and over-limit block

Context: the sheet shows `${length} / ${MAX_PROMPT_LENGTH}` and an over-limit alert. Desired behavior: tests assert both texts and that no submit happens over the limit. Expected result: removing the overLimit guard fails the tests.

## Acceptance criteria
- Given 3 typed characters, then the counter reads '3 / 500'
- Given 501 characters, when Send is clicked, then the alert reads 'Too long: 501 / 500' and submitContribution has 0 calls


## Scope
- In scope: Counter and over-limit assertions
- Out of scope: Blank and quota behaviour
- Preserve: MAX_PROMPT_LENGTH constant


## Technical constraints
- Import MAX_PROMPT_LENGTH from the client rather than hard-coding 500 in logic


## Definition of done
- Over-limit tests pass and fail without the guard


## Clarifying questions
- None
