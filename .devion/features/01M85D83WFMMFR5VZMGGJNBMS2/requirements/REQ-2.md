---
id: "01M85D83WG7166BAHAHVAFVP7Z"
kind: requirement
parent: 01M85D83WFMMFR5VZMGGJNBMS2
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# REQ · Over-limit text shows an inline message and blocks submit

Context: handleSubmit only blocks blank text. Desired behavior: compute over-limit from trimmed character count; show an inline message, set aria-invalid, and refuse to submit. Expected result: over-limit ideas are never sent. Why: backend would reject them anyway.

## Acceptance criteria
- Given 501 characters, Then the message 'Too long: 501 / 500' is visible in a role=alert element
- Given 501 characters, When Send is clicked, Then submitContribution is not called and the text is kept
- Given 500 characters, Then no over-limit message shows and Send submits
- Given over-limit text is edited down to 500 characters, Then the message disappears


## Scope
- In scope: Over-limit message
- In scope: Guard in handleSubmit
- In scope: aria-invalid on over-limit
- Out of scope: Counter
- Out of scope: Backend validation
- Preserve: Blank message behavior
- Preserve: Textarea is not hard-truncated so the message is reachable


## Technical constraints
- Do not set the maxLength attribute, because it would make the over-limit state unreachable


## Dependencies
- REQ1


## Definition of done
- Over-limit blocks submit and shows message


## Clarifying questions
- None
