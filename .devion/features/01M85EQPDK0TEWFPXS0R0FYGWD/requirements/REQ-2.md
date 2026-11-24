---
id: "01M85EQPDMR567DQ07VK6W42F2"
kind: requirement
parent: 01M85EQPDK0TEWFPXS0R0FYGWD
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# REQ · History list shows an empty state when the player has no suggestions

Context: an empty history currently renders a blank list. Desired behavior: after listMine resolves with no items and no local entries exist, show 'No suggestions yet this round'. Why: distinguishes empty from loading or broken.

## Acceptance criteria
- Given listMine resolves with [], when loading ends, then 'No suggestions yet this round' is visible and 'Contributions left: 5' shows
- Given the empty state is shown, when the player submits a suggestion, then the empty message disappears and the entry is listed


## Scope
- In scope: Empty-state render
- Out of scope: Loading and error states
- Preserve: Submit flow


## Definition of done
- Empty state renders only when ready and entries empty


## Clarifying questions
- None
