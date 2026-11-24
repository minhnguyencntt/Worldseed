---
id: "01M85DHGKS1JD7SGNJ3S8TYG2E"
kind: requirement
parent: 01M85DHGKS8E1RJQK4DANARNV3
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# REQ · Send is disabled and submit is blocked when remaining quota is 0

Context: handleSubmit (L71-93) only guards blank and over-limit. Desired behavior: at remaining 0 the Send button is disabled and handleSubmit returns before calling submitContribution. Expected result: no request is made past the quota. Why: prevents wasted requests and 409 errors.

## Acceptance criteria
- Given remaining is 0 When the sheet renders Then the Send button has the disabled attribute
- Given remaining is 0 When the form is submitted programmatically Then submitContribution is not called and no entry is added
- Given remaining is 1 When valid text is submitted Then submitContribution is called once


## Scope
- In scope: Disabled attribute on Send
- In scope: Guard in handleSubmit
- Out of scope: Message text
- Preserve: Valid submit flow
- Preserve: Blank and over-limit guards


## Technical constraints
- Guard must work even if the button is bypassed via form submit event


## Definition of done
- Send disabled and submit blocked at zero quota


## Clarifying questions
- None
