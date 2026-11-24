---
id: "01M85F81SH701MY8G7SKZHQD16"
kind: unit
parent: 01M85F81SG6PB1WC0F7KBQJF4P
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Act: Add reload counter and Retry button to the history effect

Add reloadKey state, include it in the effect deps, and render Retry calling only setReloadKey.

## Acceptance criteria
- Retry triggers a new listMine call
- Retry only appears in error state


## Scope
- In scope: reloadKey and Retry button
- Out of scope: Auto retry
- Preserve: Single writer for status


## Technical constraints
- Button handler must not call setHistoryStatus
- Code path: `game/frontend/src/components/ContributionSheet.tsx`


## Dependencies
- A1


## Definition of done
- Retry re-runs the effect


## Clarifying questions
- None
