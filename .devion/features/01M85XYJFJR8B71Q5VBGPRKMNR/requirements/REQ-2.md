---
id: "01M85XYJFJTP6P70ERPF2MVDNA"
kind: requirement
parent: 01M85XYJFJR8B71Q5VBGPRKMNR
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# REQ · Gold + SUGGEST WHAT HAPPENS NEXT header button opens the contribution dialog

Context: the Suggest button is a frame button in App.tsx scene slot with triggerRef. Desired behavior: move it into HeaderOverlay as a gold button labelled + SUGGEST WHAT HAPPENS NEXT, keeping the accessible name Suggest What Happens Next and focus return. Expected result: one suggest button, in the header; App no longer renders the old one. Why: matches the reference and removes the replaced path.

## Acceptance criteria
- Given the header with onSuggest, when the player clicks the button named Suggest What Happens Next, then onSuggest is called once.
- Given App after Begin, when the player clicks that button, then the contribution dialog opens and exactly one such button exists.
- Given the dialog closes, when Escape is pressed, then focus returns to the header button.


## Scope
- In scope: gold Button variant
- In scope: HeaderOverlay props onSuggest and suggestRef
- In scope: App wiring and removal of the old button
- Out of scope: ContributionSheet internals
- Preserve: contribution API flow
- Preserve: focus return via returnFocusRef


## Technical constraints
- Keep contribution flow and Go API contracts.
- Radix dialog stays.


## Dependencies
- INT


## Definition of done
- Old button removed from App.tsx


## Non-functional requirements
- Accessible name unchanged


## Clarifying questions
- None
