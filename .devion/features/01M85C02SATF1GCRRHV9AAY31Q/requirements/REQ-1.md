---
id: "01M85C02SB3Y38NZKKSHV12GN7"
kind: requirement
parent: 01M85C02SATF1GCRRHV9AAY31Q
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# REQ · Contribution modal is a Radix dialog opened from gameplay with correct focus and keyboard behavior

Context: ContributionSheet renders a div with role=dialog and no focus management. Desired behavior: Radix Dialog gives focus trapping, Escape to close and focus restore to the trigger, without navigation. Expected result: keyboard users can open, use and dismiss the modal. Why: accessibility and polish requirement.

## Acceptance criteria
- Given the gameplay screen, when the trigger button is clicked, then a role=dialog named 'Suggest What Happens Next' is in the document and location is unchanged
- Given an open dialog, when Escape is pressed, then onClose is called and the dialog is removed
- Given the dialog opens, then focus is inside the dialog, and after closing, focus returns to the trigger button


## Scope
- In scope: ContributionSheet Dialog shell
- In scope: App trigger wiring
- Out of scope: Validation and history logic
- Preserve: Props open, onClose, roundId
- Preserve: Heading text and form labels


## Technical constraints
- Use @radix-ui/react-dialog


## Definition of done
- Dialog is Radix-based and keyboard accessible


## Non-functional requirements
- Accessible name and description present


## Clarifying questions
- None
