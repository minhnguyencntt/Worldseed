---
id: "01M85FWFYE6T0BGGMNHZ3BZKFR"
kind: intent
parent: null
status: draft
links: []
agent: null
source: llm
evidence: {"project_id":"944dfe9c-3760-4ab1-81a3-865a561626d8"}
---
# SG-8.4.4 Contribution history error message with Retry

Context: ContributionSheet already loads history through listMine and has a HistoryStatus of loading, ready or error, plus a Retry button driven by reloadKey. Desired behavior: when history fails, the player sees 'Could not load your suggestions' with a Retry button, and clicking Retry reloads the history and returns to the loading state. Expected result: the behavior is confirmed in code and locked by unit tests. Why: the player must be able to recover from a failed history load without closing the modal.

## Acceptance criteria
- Given listMine rejects, When the sheet opens, Then role=alert shows 'Could not load your suggestions' and a Retry button is present
- Given the error state, When Retry is clicked, Then the error message and Retry button disappear and 'Loading your suggestions…' is shown while listMine is pending
- Given Retry is clicked, When listMine is called again and resolves, Then listMine has been called twice and the history list is shown


## Scope
- In scope: ContributionSheet history error and Retry behavior
- Out of scope: Backend changes
- Out of scope: Submit flow
- Out of scope: Empty and loading message copy
- Preserve: listMine API contract
- Preserve: HistoryStatus type
- Preserve: Existing contribution tests


## Technical constraints
- React + Zustand-free local state in ContributionSheet
- Use the real api client module, mocked only in unit tests


## Definition of done
- Error message and Retry present on failure
- Retry returns to loading and reloads history
- Unit tests pass


## Non-functional requirements
- Error is announced via role=alert


## Clarifying questions
- None
