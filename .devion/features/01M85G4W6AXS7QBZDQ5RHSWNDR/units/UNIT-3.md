---
id: "01M85G4W6BXAVS2KCKAPND2A9W"
kind: unit
parent: 01M85G4W6AFSNHZ3WQXQA4JVAF
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Act: Add a test id to the history error alert

Edit ContributionSheet.tsx so the history error alert is addressable by test id; Retry button untouched.

## Acceptance criteria
- Error paragraph has data-testid contribution-history-error
- Retry button unchanged


## Scope
- In scope: ContributionSheet.tsx L155
- Out of scope: Tests
- Out of scope: Retry logic
- Preserve: role alert
- Preserve: Retry button


## Technical constraints
- Code path: `game/frontend/src/components/ContributionSheet.tsx`


## Definition of done
- Attribute added


## Clarifying questions
- None
