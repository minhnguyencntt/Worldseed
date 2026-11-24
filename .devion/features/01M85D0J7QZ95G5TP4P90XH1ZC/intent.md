---
id: "01M85D0J7QZ95G5TP4P90XH1ZC"
kind: intent
parent: null
status: draft
links: []
agent: null
source: llm
evidence: {"project_id":"944dfe9c-3760-4ab1-81a3-865a561626d8"}
---
# SG-8.2.1 Block blank contribution submit with an inline message

Context: ContributionSheet.handleSubmit currently executes `if (prompt === '') return;`, so pressing Send with empty or whitespace-only text does nothing and the player gets no feedback. Desired behavior: block the submit and show an inline message 'Enter an idea first'. Expected result: no API call is made and the message is visible and announced. Why: players must understand why nothing was sent.

## Acceptance criteria
- Given the dialog is open and the textarea is empty, when Send is pressed, then 'Enter an idea first' is shown in an element with role=alert and submitContribution is not called
- Given the textarea holds only spaces or newlines, when Send is pressed, then the same message is shown and submitContribution is not called
- Given the message is shown, when the player types a character, then the message disappears and a valid idea still submits to the backend


## Scope
- In scope: game/frontend/src/components/ContributionSheet.tsx blank-text validation message
- Out of scope: Max length counter and quota gating
- Out of scope: Backend API changes
- Out of scope: Visual restyling of the dialog
- Preserve: submitContribution and listMine API contracts
- Preserve: Server error messages from errorMessage
- Preserve: Existing Radix Dialog focus behavior
- Preserve: Trimmed prompt sent on valid submit


## Technical constraints
- React + TypeScript, existing ContributionSheet component
- No new dependencies
- No mock data replacing the real backend client


## Definition of done
- Blank and whitespace-only submit shows 'Enter an idea first' and sends nothing
- Message clears on typing
- Unit tests cover each acceptance criterion


## Non-functional requirements
- Message is exposed to assistive tech via role=alert and aria-describedby


## Clarifying questions
- None
