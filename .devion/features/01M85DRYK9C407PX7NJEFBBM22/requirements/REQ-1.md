---
id: "01M85DRYK9TT2Y2TQ6WMFMEP5W"
kind: requirement
parent: 01M85DRYK9C407PX7NJEFBBM22
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# REQ · Zero remaining quota shows an inline 'used all your suggestions' message

Context: the sheet shows 'Contributions left: N' only. Desired behavior: when remaining is 0 an inline alert reads 'You have used all your suggestions this round'. Expected result: the message is present at 0 and absent above 0. Why: the player needs a clear reason Send is unavailable.

## Acceptance criteria
- Given 5 sent entries from listMine, when the sheet opens, then 'You have used all your suggestions this round' is in the document
- Given fewer than 5 sent entries, when the sheet opens, then that text is not in the document


## Scope
- In scope: Inline message render in ContributionSheet
- Out of scope: Send disabling
- Out of scope: Backend changes
- Preserve: Contributions left counter text
- Preserve: Existing validation messages


## Technical constraints
- Message text must be exactly 'You have used all your suggestions this round'


## Dependencies
- INT-1


## Definition of done
- Message renders at remaining 0 and not above 0


## Clarifying questions
- None
