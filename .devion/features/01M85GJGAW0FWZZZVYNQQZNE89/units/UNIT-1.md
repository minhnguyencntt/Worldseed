---
id: "01M85GJGAXRD4VPBJ4SY2NZC36"
kind: unit
parent: 01M85GJGAX0FQ3YQN6Y02GB5SQ
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Act: Add test ids to the submit error and quota alerts

Add data-testid=contribution-error to the submit error paragraph and data-testid=contribution-quota to the zero-quota paragraph without changing text or roles.

## Acceptance criteria
- The error paragraph renders data-testid contribution-error
- The quota paragraph renders data-testid contribution-quota


## Scope
- In scope: ContributionSheet.tsx alerts
- Out of scope: Tests
- Preserve: Alert text and role


## Technical constraints
- Code path: `game/frontend/src/components/ContributionSheet.tsx`


## Definition of done
- Both attributes present in the JSX


## Clarifying questions
- None
