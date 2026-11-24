---
id: "01M85EQPDMPPDBHND9AQQ27Q86"
kind: unit
parent: 01M85EQPDMR567DQ07VK6W42F2
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Act: Render the empty history state in ContributionSheet

Render 'No suggestions yet this round' when historyStatus is 'ready' and entries is empty.

## Acceptance criteria
- Empty message shown only when ready and entries.length === 0
- Message disappears once an entry exists


## Scope
- In scope: ContributionSheet.tsx
- Out of scope: Tests
- Preserve: Submit flow


## Technical constraints
- Code path: `game/frontend/src/components/ContributionSheet.tsx`


## Definition of done
- Empty state implemented


## Clarifying questions
- None
