---
id: "01M85EE0N92EPCTVAMP619TYCZ"
kind: unit
parent: 01M85EE0N9VTQS9942EEY8GEJR
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Act: Show the 'Sending…' loading label on the Send button

Render 'Sending…' as the button label while submitting is true, otherwise 'Send'. Uses the submitting state added for the disabled computation.

## Acceptance criteria
- Button text is 'Sending…' while submitting is true.
- Button text is 'Send' whenever submitting is false.


## Scope
- In scope: Send button label
- Out of scope: Success message
- Preserve: Per-entry STATE_LABEL values


## Technical constraints
- Requires the submitting state from the disabled-state unit to exist in the file
- Code path: `game/frontend/src/components/ContributionSheet.tsx`


## Dependencies
- ACT-1


## Definition of done
- Label toggles with submitting


## Clarifying questions
- None
