---
id: "01M85CF86VP9J0VHQ2EDFDFSYF"
kind: intent
parent: null
status: draft
links: []
agent: null
source: llm
evidence: {"project_id":"944dfe9c-3760-4ab1-81a3-865a561626d8"}
---
# SG-8.1 Rebuild the contribution sheet on the Radix dialog

Context: game/frontend/src/components/ContributionSheet.tsx renders a hand-made div with role=dialog, so it has no focus trap, no Escape handling and no focus restoration. @radix-ui/react-dialog is already a dependency but no wrapper exists under src/components/ui. Desired behavior: the sheet is built on the Radix dialog through a shadcn-style wrapper. Expected result: Tab stays inside the sheet, Escape closes it, focus returns to the Suggest What Happens Next trigger and the dialog exposes a title and description. Why: keyboard and screen-reader accessibility.

## Acceptance criteria
- Given the sheet is open, when the player presses Escape, then onClose is called
- Given the sheet is open, when the player tabs past the last control, then focus stays inside the dialog
- Given the sheet closes, when the dialog unmounts, then focus returns to the Suggest What Happens Next trigger
- Given the sheet is open, then the dialog is labelled by a title and described by a description


## Scope
- In scope: Dialog wrapper in src/components/ui
- In scope: ContributionSheet rebuilt on it
- In scope: App trigger focus restoration
- Out of scope: Backend or API changes
- Out of scope: Changes to submission, quota or history logic
- Preserve: ContributionSheetProps open, onClose and roundId
- Preserve: POST /api/v1/contributions and listMine behavior
- Preserve: Existing labels Your idea, Send, Your suggestions


## Technical constraints
- Use the existing @radix-ui/react-dialog dependency
- Use cn from src/lib/utils
- No new dependencies


## Definition of done
- All three requirements implemented and verified by unit tests


## Non-functional requirements
- Keyboard accessible
- WAI-ARIA dialog semantics


## Clarifying questions
- None
