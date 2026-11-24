---
id: "01M85GJGAX6WNQ3PBKGMXZJ5KD"
kind: requirement
parent: 01M85GJGAW0FWZZZVYNQQZNE89
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# REQ · History loading, empty, error and list states are identifiable and asserted

Context: loading, empty and error messages have test ids; the list does not. Desired behavior: the history list carries a test id. Expected result: tests assert loading, empty, error with Retry and populated list. Why: SG-8.5 history coverage.

## Acceptance criteria
- Given a pending history request, when the sheet opens, then contribution-history-loading is shown
- Given an empty history, when it loads, then contribution-history-empty is shown
- Given a failing history request, when it settles, then contribution-history-error and a Retry button are shown
- Given two past suggestions, when history loads, then contribution-history-list contains both prompts marked Sent


## Scope
- In scope: Test id on the suggestions list
- Out of scope: Changes to loading logic
- Preserve: aria-label 'Your suggestions'


## Definition of done
- History tests pass


## Clarifying questions
- None
