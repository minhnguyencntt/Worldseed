---
id: "01M85EQPDMVMFGVRG61TNDQT0T"
kind: unit
parent: 01M85EQPDKABP1DT0AEX9BHXMP
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Act: Add historyStatus state and loading message to ContributionSheet

Add a historyStatus state ('loading'|'ready'|'error') set by the history effect and render a loading status message in the history area.

## Acceptance criteria
- historyStatus is 'loading' when the effect starts and 'ready' after listMine resolves
- 'Loading your suggestions…' renders while loading and the list renders only when not loading


## Scope
- In scope: ContributionSheet.tsx
- Out of scope: Tests
- Preserve: Merge logic in setEntries


## Technical constraints
- Keep remaining derived from entries
- Code path: `game/frontend/src/components/ContributionSheet.tsx`


## Definition of done
- Loading state implemented


## Clarifying questions
- None
