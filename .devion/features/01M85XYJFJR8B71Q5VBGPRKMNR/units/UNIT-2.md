---
id: "01M85XYJFJF30S3PQ5J0KMC9SM"
kind: unit
parent: 01M85XYJFJTP6P70ERPF2MVDNA
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Act: Add gold button variant, header suggest button and App wiring

Wire onSuggest and suggestRef through HeaderOverlay from App.

## Acceptance criteria
- Header shows the gold suggest button with the accessible name Suggest What Happens Next.
- App has no other suggest button.


## Scope
- In scope: button.tsx
- In scope: styles.css
- In scope: HeaderOverlay.tsx
- In scope: App.tsx
- Out of scope: tests
- Preserve: ContributionSheet props


## Technical constraints
- Palette tokens only; Tailwind and React stay.
- Code path: `game/frontend/src/components/ui/button.tsx`
- Code path: `game/frontend/src/styles.css`
- Code path: `game/frontend/src/components/HeaderOverlay.tsx`
- Code path: `game/frontend/src/App.tsx`


## Dependencies
- REQ2


## Definition of done
- Button lives in header only


## Clarifying questions
- None
