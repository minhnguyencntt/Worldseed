---
id: "01M85FWFYFE625T3SW7DMYMFW3"
kind: unit
parent: 01M85FWFYE26ZRTDR5WTEPR56G
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Act: Confirm Retry increments reloadKey and the effect resets to loading

Confirm onClick calls setReloadKey((k) => k + 1), reloadKey is in the effect deps, and the effect begins with setHistoryStatus('loading') before listMine.

## Acceptance criteria
- Retry click changes reloadKey
- Effect sets status 'loading' before calling listMine


## Scope
- In scope: Retry handler and history effect
- Out of scope: Tests
- Preserve: cancelled guard


## Technical constraints
- Code path: `game/frontend/src/components/ContributionSheet.tsx`


## Definition of done
- Retry flow confirmed to reload and show loading


## Clarifying questions
- None
