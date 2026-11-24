---
id: "01M85EE0N9VPTS685VVFDHSM4D"
kind: requirement
parent: 01M85EE0N9R3JXK44PFF7NJ3YB
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# REQ · Inline success feedback is shown after a successful send alongside the existing error feedback

Context: success is only implied by the entry's 'Sent' label. Desired behavior: after submitContribution resolves, show 'Suggestion sent' in a role=status paragraph; clear it when the user types or starts another send; a failure clears it and shows the existing error. Why: explicit confirmation to the player.

## Acceptance criteria
- Given submitContribution resolves, when the request settles, then a role=status element with 'Suggestion sent' is visible and no error alert is shown.
- Given submitContribution rejects with 429, when the request settles, then the 'Slow down, try again shortly' alert is shown and the success message is absent.
- Given a visible success message, when the user types in the textarea, then the success message is removed.


## Scope
- In scope: success message state and rendering
- Out of scope: Toast or animation
- Out of scope: Changing error wording
- Preserve: errorMessage function and the role=alert error paragraph


## Technical constraints
- Success message is inside the sheet, not a global toast


## Definition of done
- Success and error messages are mutually exclusive and clear correctly


## Non-functional requirements
- Success message uses role=status so it is announced politely


## Clarifying questions
- None
