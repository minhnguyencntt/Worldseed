---
id: "01M85GJGAXW92AW56C3Q807DH1"
kind: requirement
parent: 01M85GJGAW0FWZZZVYNQQZNE89
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# REQ · Empty and over-length text are rejected with identifiable messages

Context: blank and over-limit alerts exist with ids but no test ids. Desired behavior: add test ids; tests assert messages and absence of POST. Why: SG-8.5 validation coverage.

## Acceptance criteria
- Given empty text, when the form is submitted, then contribution-validation-blank shows 'Enter an idea first' and no POST is made
- Given 501 characters, when typed, then contribution-validation-limit shows 'Too long: 501 / 500', Send is disabled and no POST is made
- Given exactly 500 characters, when sent, then contribution-validation-limit is absent and POST is made


## Scope
- In scope: Test ids on validation alerts
- Out of scope: Limit changes
- Preserve: MAX_PROMPT_LENGTH 500


## Definition of done
- Validation tests pass


## Clarifying questions
- None
