---
id: "01M85GJGAXANKK5YTFJN199R99"
kind: unit
parent: 01M85GJGAX6WNQ3PBKGMXZJ5KD
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Act: Add a test id to the contribution history list

Add data-testid=contribution-history-list to the ul labelled Your suggestions.

## Acceptance criteria
- The ul renders data-testid contribution-history-list
- The aria-label is unchanged


## Scope
- In scope: ContributionSheet.tsx list
- Out of scope: Tests
- Preserve: List markup


## Technical constraints
- Code path: `game/frontend/src/components/ContributionSheet.tsx`


## Definition of done
- Attribute present


## Clarifying questions
- None
