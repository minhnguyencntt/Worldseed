---
id: "01M85DHGKSJBH3MSY772BM1TN0"
kind: requirement
parent: 01M85DHGKS8E1RJQK4DANARNV3
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# REQ · Zero remaining quota shows an inline 'used all your suggestions' message

Context: remaining is computed at ContributionSheet.tsx L67 from sent entries. Desired behavior: when remaining is 0 the sheet renders 'You have used all your suggestions this round' inline. Expected result: the player sees why sending is unavailable. Why: clear feedback.

## Acceptance criteria
- Given 5 sent contributions loaded from history When the sheet opens Then 'You have used all your suggestions this round' is visible with role alert
- Given fewer than 5 sent contributions When the sheet opens Then the message is absent


## Scope
- In scope: Quota message rendering
- Out of scope: Disabling Send
- Preserve: Existing counter text and validation messages


## Technical constraints
- Message text must match exactly


## Definition of done
- Message renders only at zero quota


## Clarifying questions
- None
