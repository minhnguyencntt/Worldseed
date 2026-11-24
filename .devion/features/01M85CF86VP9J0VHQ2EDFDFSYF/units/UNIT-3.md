---
id: "01M85CF86W3RMJNMN5VVZKGJR2"
kind: unit
parent: 01M85CF86V7QNKE69RG9R7WE5D
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Act: Return focus to the trigger when the sheet closes

ContributionSheet accepts optional returnFocusRef; DialogContent onCloseAutoFocus focuses it; App holds the ref on the trigger button.

## Acceptance criteria
- Given a returnFocusRef with a current element, when the sheet closes, then that element receives focus
- Given no returnFocusRef is passed, when the sheet closes, then the Radix default focus restoration applies


## Scope
- In scope: ContributionSheet.tsx prop
- In scope: App.tsx ref
- Out of scope: Tests
- Preserve: Existing props


## Technical constraints
- Prop is optional
- Code path: `game/frontend/src/components/ContributionSheet.tsx`
- Code path: `game/frontend/src/App.tsx`


## Dependencies
- ACT2


## Definition of done
- Trigger focused after close


## Clarifying questions
- None
