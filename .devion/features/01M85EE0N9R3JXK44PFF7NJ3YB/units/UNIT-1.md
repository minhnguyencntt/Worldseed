---
id: "01M85EE0N99M8WDBVP3T9QKHRK"
kind: unit
parent: 01M85EE0N95XDRZ1G9V9DN3RGX
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Act: Add submitting state and full disabled computation to ContributionSheet Send

Add a 'submitting' boolean state to ContributionSheet, set it around the await in handleSubmit, guard re-entry, and compute the Send disabled attribute from all four conditions.

## Acceptance criteria
- Send is disabled when text is blank, over limit, remaining <= 0 or submitting is true.
- handleSubmit returns early when submitting is true.


## Scope
- In scope: ContributionSheet.tsx state and disabled prop
- Out of scope: Label and success message
- Preserve: Existing validation messages and guards


## Technical constraints
- Do not touch test files
- Code path: `game/frontend/src/components/ContributionSheet.tsx`


## Definition of done
- Send disabled attribute reflects all four conditions


## Clarifying questions
- None
