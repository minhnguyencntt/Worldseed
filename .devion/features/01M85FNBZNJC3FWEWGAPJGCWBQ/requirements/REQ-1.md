---
id: "01M85FNBZNB86XC44Q1ER45E7J"
kind: requirement
parent: 01M85FNBZNJC3FWEWGAPJGCWBQ
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# REQ · Empty loaded history shows 'No suggestions yet this round' and hides once an entry exists

Context: ContributionSheet.tsx renders the entries list unconditionally and has no empty state. Desired behavior: render a paragraph with the exact text 'No suggestions yet this round' only while historyStatus is 'ready' and entries is empty. Expected result: it appears after an empty successful load and disappears when any entry is added. Why: gives the player clear feedback.

## Acceptance criteria
- Given historyStatus is 'ready' and entries is empty, when rendered, then 'No suggestions yet this round' is shown with role=status.
- Given the message is shown, when a submission adds an entry, then the message is removed.
- Given historyStatus is 'loading' or 'error', when entries is empty, then the message is not rendered.


## Scope
- In scope: Conditional empty message in ContributionSheet
- Out of scope: New API calls
- Preserve: Existing history behavior and messages


## Technical constraints
- Derive from existing state; do not add a new state variable


## Definition of done
- Act and Verify units complete


## Clarifying questions
- None
