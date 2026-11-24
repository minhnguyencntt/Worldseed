---
id: "01M85DRYK9ZAFEN5R1DVT24BE1"
kind: unit
parent: 01M85DRYK9TT2Y2TQ6WMFMEP5W
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Act: Render the zero-quota inline message in ContributionSheet

Add a conditional paragraph in ContributionSheet JSX showing the zero-quota message when remaining <= 0.

## Acceptance criteria
- At remaining 0 the paragraph with role alert shows the exact message
- At remaining above 0 no such element renders


## Scope
- In scope: ContributionSheet.tsx JSX
- Out of scope: Send disabled
- Out of scope: handleSubmit
- Preserve: Existing alerts for validation and over-limit


## Technical constraints
- Use existing remaining constant
- Code path: `game/frontend/src/components/ContributionSheet.tsx`


## Dependencies
- REQ-1


## Definition of done
- Message renders only at remaining 0


## Clarifying questions
- None
