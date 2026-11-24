---
id: "01M85FNBZNJC3FWEWGAPJGCWBQ"
kind: intent
parent: null
status: draft
links: []
agent: null
source: llm
evidence: {"project_id":"944dfe9c-3760-4ab1-81a3-865a561626d8"}
---
# SG-8.4.3 Show 'No suggestions yet this round' for an empty loaded history

Context: ContributionSheet loads the player's history with listMine and tracks historyStatus ('loading' | 'ready' | 'error'), but renders nothing when the load succeeds with zero entries. Desired behavior: when history loaded successfully and there are no entries, show 'No suggestions yet this round'; hide it as soon as an entry is added. Expected result: the player sees an explicit empty state. Why: an empty list is otherwise indistinguishable from a broken one.

## Acceptance criteria
- Given listMine resolves with an empty list, when the sheet is open, then the text 'No suggestions yet this round' is visible.
- Given the empty message is visible, when the player submits an idea and an entry appears (sending, sent or failed), then the message is no longer in the document.
- Given history is loading or failed to load, then the empty message is not shown.


## Scope
- In scope: Empty-history message in ContributionSheet
- Out of scope: Backend changes
- Out of scope: Loading and error states, which already exist
- Out of scope: Restyling the modal
- Preserve: Existing loading, error, Retry, validation, quota and submit behavior
- Preserve: listMine and submitContribution API contracts


## Technical constraints
- React + TypeScript in game/frontend
- Use the existing historyStatus state and entries list; no new state owner
- No backend or API change


## Definition of done
- Requirement implemented and verified by unit tests
- Existing contribution tests still pass


## Non-functional requirements
- Message exposed to assistive tech via role=status


## Clarifying questions
- None
