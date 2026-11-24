---
id: "01M85CF86VWZFWD56BTXPAKRGR"
kind: requirement
parent: 01M85CF86VP9J0VHQ2EDFDFSYF
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# REQ · ContributionSheet is a Radix dialog with focus trap, Escape and a title and description

Context: ContributionSheet.tsx returns a plain div with role=dialog and a Close button. Desired behavior: render it inside Dialog with open and onOpenChange mapped to onClose, DialogTitle Suggest What Happens Next and DialogDescription Ideas are considered when the Round closes. Expected result: Escape closes, Tab is trapped, name and description are announced. Why: accessibility.

## Acceptance criteria
- Given the sheet is open, when Escape is pressed, then onClose is called once
- Given the sheet is open, then getByRole dialog has accessible name Suggest What Happens Next and a non-empty accessible description
- Given open is false, then no dialog is rendered
- Given the Close button is clicked, then onClose is called
- Given existing submit and history flows, then they behave as before


## Scope
- In scope: ContributionSheet.tsx markup
- Out of scope: Submission and history logic
- Preserve: errorMessage export
- Preserve: Remaining count text
- Preserve: Send button and Your idea label


## Technical constraints
- Keep hooks before any early return


## Dependencies
- REQ1


## Definition of done
- Sheet built on ui/dialog parts


## Non-functional requirements
- Focus is trapped while open


## Clarifying questions
- None
