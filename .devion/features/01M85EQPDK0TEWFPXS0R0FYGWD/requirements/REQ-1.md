---
id: "01M85EQPDKABP1DT0AEX9BHXMP"
kind: requirement
parent: 01M85EQPDK0TEWFPXS0R0FYGWD
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# REQ · History list shows a loading state and remaining is derived from history

Context: no loading indicator exists while listMine is in flight. Desired behavior: a status message 'Loading your suggestions…' shows until listMine settles, after which the list and the remaining count (MAX_PER_PLAYER minus sent entries) render. Why: the player knows history is being fetched.

## Acceptance criteria
- Given listMine is pending, when the sheet opens, then an element with role status and text 'Loading your suggestions…' is visible
- Given listMine resolves with 2 contributions, when loading ends, then the loading text is gone, both prompts are listed and 'Contributions left: 3' shows


## Scope
- In scope: historyStatus state and loading render
- Out of scope: Empty and error states
- Preserve: Merge of history with in-flight entries


## Technical constraints
- Remaining remains computed from entries


## Definition of done
- Loading state renders and clears


## Clarifying questions
- None
