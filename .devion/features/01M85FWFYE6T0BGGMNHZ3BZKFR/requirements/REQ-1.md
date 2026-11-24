---
id: "01M85FWFYE2GXA5JQX2YN2SWK7"
kind: requirement
parent: 01M85FWFYE6T0BGGMNHZ3BZKFR
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# REQ · Failed history load shows 'Could not load your suggestions' with a Retry button

Context: ContributionSheet sets historyStatus to 'error' in the listMine catch. Desired behavior: in that state it renders the HISTORY_ERROR alert and a Retry button. Expected result: the player sees the explained failure and a way to retry. Why: failures must not be silent.

## Acceptance criteria
- Given listMine rejects, When the sheet is open, Then an element with role=alert has text 'Could not load your suggestions'
- Given listMine rejects, When the sheet is open, Then a button named 'Retry' is present
- Given listMine resolves, When the sheet is open, Then neither the error nor Retry is shown


## Scope
- In scope: Error alert and Retry button rendering
- Out of scope: Reload logic
- Preserve: Other alerts in the sheet


## Technical constraints
- Message text must remain 'Could not load your suggestions'


## Definition of done
- Error and Retry render only in error state


## Clarifying questions
- None
