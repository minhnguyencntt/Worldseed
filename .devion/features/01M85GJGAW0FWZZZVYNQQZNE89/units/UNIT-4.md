---
id: "01M85GJGAXM2A2MY26GBS52SZN"
kind: unit
parent: 01M85GJGAX45VNX5JKP0N456WJ
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Act: Add a test id to the contribution Close button

Add data-testid=contribution-close to the Close button in ContributionSheet.

## Acceptance criteria
- Close button renders data-testid contribution-close
- Its onClick still calls onClose


## Scope
- In scope: ContributionSheet.tsx Close button
- Out of scope: Tests
- Preserve: Button label


## Technical constraints
- Code path: `game/frontend/src/components/ContributionSheet.tsx`


## Definition of done
- Attribute present


## Clarifying questions
- None
