---
id: "01M85CR1JW0B6AWF2VBGRS207Q"
kind: unit
parent: 01M85CR1JVHTC12JQQ2HHV8S0E
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Act: Add blank-text validation to ContributionSheet

Implement blank validation in handleSubmit and render logic of ContributionSheet.

## Acceptance criteria
- Send is disabled when text.trim() is empty
- Submitting blank text shows the inline message and does not call submitContribution


## Scope
- In scope: ContributionSheet.tsx
- Out of scope: Tests
- Preserve: Valid submit flow


## Technical constraints
- Code path: `game/frontend/src/components/ContributionSheet.tsx`


## Definition of done
- Blank prompts blocked with inline role=alert message


## Clarifying questions
- None
