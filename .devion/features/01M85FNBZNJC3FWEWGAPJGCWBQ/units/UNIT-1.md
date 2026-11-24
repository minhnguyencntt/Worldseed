---
id: "01M85FNBZNEJ7P3ASDTHRFZPWA"
kind: unit
parent: 01M85FNBZNB86XC44Q1ER45E7J
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Act: Render the empty history message in ContributionSheet

Add a paragraph rendered only when historyStatus === 'ready' and entries.length === 0, with the text 'No suggestions yet this round'. Product code only.

## Acceptance criteria
- The message renders when status is ready and entries is empty.
- The message is absent when status is loading or error, or entries is non-empty.


## Scope
- In scope: game/frontend/src/components/ContributionSheet.tsx
- Out of scope: Tests
- Preserve: Existing markup and messages


## Technical constraints
- No new state
- Code path: `game/frontend/src/components/ContributionSheet.tsx`


## Definition of done
- Empty message renders per condition
- TypeScript compiles


## Clarifying questions
- None
