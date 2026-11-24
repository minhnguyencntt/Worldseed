---
id: "01M85DRYK94HW2N10MR4594REX"
kind: unit
parent: 01M85DRYK94XS9EKM0FX1X39SE
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Act: Disable Send and guard handleSubmit at zero quota

Add disabled prop to the Send button and an early return in handleSubmit when remaining <= 0.

## Acceptance criteria
- Send button is disabled at remaining 0
- handleSubmit returns before submitContribution at remaining 0


## Scope
- In scope: handleSubmit guard
- In scope: Send button disabled prop
- Out of scope: Message rendering
- Preserve: Blank and over-limit checks
- Preserve: Submit success and failure flow


## Technical constraints
- Guard placed first in handleSubmit after event.preventDefault()
- Code path: `game/frontend/src/components/ContributionSheet.tsx`


## Dependencies
- REQ-2


## Definition of done
- No backend call at zero quota


## Clarifying questions
- None
