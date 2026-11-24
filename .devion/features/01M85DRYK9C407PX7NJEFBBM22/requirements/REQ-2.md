---
id: "01M85DRYK94XS9EKM0FX1X39SE"
kind: requirement
parent: 01M85DRYK9C407PX7NJEFBBM22
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# REQ · Send is disabled and submit is blocked when remaining quota is 0

Context: the Send button is always enabled and handleSubmit only checks blank and over-limit. Desired behavior: at remaining 0 the button is disabled and handleSubmit returns before calling submitContribution. Expected result: no backend submit at zero quota. Why: prevents futile requests.

## Acceptance criteria
- Given remaining is 0, when the sheet renders, then the Send button has the disabled attribute
- Given remaining is 0 and text is typed, when the form is submitted, then submitContribution is not called
- Given remaining is above 0 and valid text, when the form is submitted, then submitContribution is called once


## Scope
- In scope: Disabled attribute on Send
- In scope: Early return in handleSubmit
- Out of scope: Inline message text
- Out of scope: Backend changes
- Preserve: Blank and over-limit validation order
- Preserve: Successful submit flow


## Technical constraints
- Guard must precede the blank check side effects and any setEntries call


## Dependencies
- INT-1


## Definition of done
- Send disabled and submit blocked at 0; unchanged above 0


## Clarifying questions
- None
