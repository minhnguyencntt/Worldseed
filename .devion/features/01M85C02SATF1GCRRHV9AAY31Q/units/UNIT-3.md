---
id: "01M85C02SB3BTTHAYG62R06WRE"
kind: unit
parent: 01M85C02SBEG7ZAD8ZX633QZVB
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Act: Add loading, empty and error states to the contribution history

Track history load status in ContributionSheet and render loading, empty and error messages.

## Acceptance criteria
- Loading, empty and error messages render
- Submitting works after a history failure


## Scope
- In scope: History effect and list rendering
- Out of scope: Backend changes
- Preserve: Merge logic of history with in-flight entries


## Technical constraints
- Use listMine only
- Code path: `game/frontend/src/components/ContributionSheet.tsx`


## Definition of done
- History states implemented


## Clarifying questions
- None
