---
id: "01M85CR1JWDAP4VPV4SCSXN3GG"
kind: unit
parent: 01M85CR1JVKS7A94PP3ZPJ1BV7
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Act: Add max length, counter and over-limit message to ContributionSheet

Add MAX_PROMPT_LENGTH constant and render a counter plus over-limit message, gating submit.

## Acceptance criteria
- Counter reads N/500
- Over-limit text disables Send and shows 'Idea is too long'


## Scope
- In scope: client.ts constant
- In scope: ContributionSheet.tsx
- Out of scope: Tests
- Preserve: MAX_PER_PLAYER


## Technical constraints
- Code path: `game/frontend/src/api/client.ts`
- Code path: `game/frontend/src/components/ContributionSheet.tsx`


## Definition of done
- Length rule enforced in UI


## Non-functional requirements
- Counter linked via aria-describedby


## Clarifying questions
- None
