---
id: "01M85DHGKTWP13MJ13MQZ7XD0W"
kind: unit
parent: 01M85DHGKS1JD7SGNJ3S8TYG2E
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Act: Disable Send and guard handleSubmit at zero quota

In ContributionSheet.tsx add a disabled attribute on the Send button and an early return in handleSubmit when remaining is 0 or less.

## Acceptance criteria
- Send button is disabled when remaining <= 0
- handleSubmit makes no submitContribution call when remaining <= 0


## Scope
- In scope: Send button disabled prop
- In scope: handleSubmit guard
- Out of scope: Tests
- Out of scope: Message rendering
- Preserve: Blank and over-limit guards order and behavior


## Technical constraints
- Guard placed before the blank check clears nothing; do not reset text
- Code path: `game/frontend/src/components/ContributionSheet.tsx`


## Definition of done
- Send disabled and submit blocked at zero quota


## Clarifying questions
- None
