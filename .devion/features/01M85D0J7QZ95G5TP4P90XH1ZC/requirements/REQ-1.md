---
id: "01M85D0J7QQZPMTWXG18QK6DB5"
kind: requirement
parent: 01M85D0J7QZ95G5TP4P90XH1ZC
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# REQ · Blank or whitespace-only submit is blocked with 'Enter an idea first'

Context: handleSubmit trims the text and silently returns when empty. Desired behavior: set a validation message 'Enter an idea first', render it inline under the textarea with role=alert, link it with aria-describedby and mark the textarea aria-invalid. Expected result: submitContribution is never called for blank text. Why: silent failure confuses players.

## Acceptance criteria
- Given an empty textarea, when the form is submitted, then an element with role=alert has the text 'Enter an idea first'
- Given text of only spaces and newlines, when the form is submitted, then the same alert appears and submitContribution is not called
- Given the alert is shown, then the textarea has aria-invalid=true and aria-describedby pointing to the alert id


## Scope
- In scope: Validation state, blank branch and inline message in ContributionSheet
- Out of scope: Length limit
- Out of scope: Quota gating
- Preserve: Server error alert rendered from error state
- Preserve: Entries list behavior


## Technical constraints
- Keep the message separate from server `error` state so it can clear independently


## Definition of done
- Alert shown for blank submit
- No API call for blank submit


## Non-functional requirements
- Accessible error association


## Clarifying questions
- None
