---
id: "01M85E1KCJ5AS57YY6J8PWY9M2"
kind: unit
parent: 01M85E1KCJXJ048HHNS6WF0J5M
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Act: Confirm blank-text guard in ContributionSheet handleSubmit

Context: ContributionSheet.handleSubmit already trims and rejects blank text. Desired behavior: no product change unless the guard or its aria wiring is missing. Expected result: the guard, BLANK_MESSAGE and aria attributes are present.

## Acceptance criteria
- handleSubmit sets validation to BLANK_MESSAGE and returns before submitContribution when the trimmed text is empty
- The textarea sets aria-invalid and aria-describedby pointing at contribution-idea-error while validation is set


## Scope
- In scope: handleSubmit blank branch
- In scope: textarea aria attributes
- Out of scope: Tests
- Preserve: Existing messages


## Technical constraints
- Code path: `game/frontend/src/components/ContributionSheet.tsx`


## Dependencies
- REQ-BLANK


## Definition of done
- Guard and aria wiring confirmed present, adding them only if missing


## Clarifying questions
- None
