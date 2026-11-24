---
id: "01M85CF86V7QNKE69RG9R7WE5D"
kind: requirement
parent: 01M85CF86VP9J0VHQ2EDFDFSYF
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# REQ · Closing the sheet returns focus to the Suggest What Happens Next trigger

Context: App.tsx opens the sheet from a plain button via sheetOpen state. Desired behavior: the trigger is a ref-held button and the sheet passes onCloseAutoFocus that focuses it. Expected result: after Escape or Close, document.activeElement is the trigger. Why: keyboard users keep their place.

## Acceptance criteria
- Given the sheet was opened from the trigger, when Escape is pressed, then the trigger has focus
- Given the sheet was opened from the trigger, when Close is clicked, then the trigger has focus


## Scope
- In scope: App.tsx trigger ref
- In scope: ContributionSheet optional returnFocusRef prop
- Out of scope: Other App behavior
- Preserve: Trigger text Suggest What Happens Next
- Preserve: roundId passing


## Technical constraints
- Optional prop so existing renders still work


## Dependencies
- REQ2


## Definition of done
- Focus returns to the trigger


## Clarifying questions
- None
