---
id: "01M85EE0N9VTQS9942EEY8GEJR"
kind: requirement
parent: 01M85EE0N9R3JXK44PFF7NJ3YB
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# REQ · Send shows a loading label while the submission is in flight

Context: the button always reads 'Send'. Desired behavior: while submitContribution is pending, the label is 'Sending…'; it reverts to 'Send' on success or failure. Why: visible progress feedback.

## Acceptance criteria
- Given a pending submitContribution, when the sheet renders, then the button name is 'Sending…'.
- Given the request resolved or rejected, when the sheet re-renders, then the button name is 'Send' again.


## Scope
- In scope: Send button label
- Out of scope: Spinner icons
- Out of scope: Entry list state labels
- Preserve: Per-entry 'Sending…' label in the list


## Technical constraints
- Reuse the in-flight state introduced for REQ-1 (a single 'submitting' boolean)


## Definition of done
- Label toggles with in-flight state


## Clarifying questions
- None
