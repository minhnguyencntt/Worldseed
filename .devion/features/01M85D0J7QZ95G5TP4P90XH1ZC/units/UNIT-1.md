---
id: "01M85D0J7Q3CYCKMW62X598P8F"
kind: unit
parent: 01M85D0J7QQZPMTWXG18QK6DB5
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Act: Show 'Enter an idea first' for blank submit in ContributionSheet

Implement the blank-text validation message in ContributionSheet so blank submit is blocked visibly.

## Acceptance criteria
- Blank or whitespace-only submit renders role=alert 'Enter an idea first'
- submitContribution is not reached for blank text


## Scope
- In scope: ContributionSheet.tsx
- Out of scope: Tests
- Out of scope: Other components
- Preserve: Existing error alert
- Preserve: API client


## Technical constraints
- Keep existing imports; no new dependencies
- Code path: `game/frontend/src/components/ContributionSheet.tsx`


## Definition of done
- Blank branch sets validation message and returns
- Message rendered with role=alert and linked to textarea


## Non-functional requirements
- aria-invalid and aria-describedby on the textarea


## Clarifying questions
- None
