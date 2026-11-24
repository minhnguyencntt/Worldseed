---
id: "01M85EQPDM9C80Z4P142EJQNC7"
kind: unit
parent: 01M85EQPDM4PRXH1HC34P00Z8Z
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Act: Add history error state and Retry to ContributionSheet

Replace the empty catch with an error status, render an alert and Retry button, and increment reloadKey on click.

## Acceptance criteria
- Rejection sets historyStatus 'error' and renders the alert and Retry
- Retry increments reloadKey causing listMine to be called again


## Scope
- In scope: ContributionSheet.tsx
- Out of scope: Tests
- Preserve: Submit still usable on error


## Technical constraints
- Code path: `game/frontend/src/components/ContributionSheet.tsx`


## Definition of done
- Error and Retry implemented


## Clarifying questions
- None
