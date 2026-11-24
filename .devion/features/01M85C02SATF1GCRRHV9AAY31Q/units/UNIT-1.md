---
id: "01M85C02SB6S6PDSR020JNXF6J"
kind: unit
parent: 01M85C02SB3Y38NZKKSHV12GN7
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Act: Wrap ContributionSheet in a Radix Dialog and wire the App trigger

Convert ContributionSheet root into Dialog.Root/Portal/Overlay/Content with Title and Description, and make App's trigger the focus-restoring opener.

## Acceptance criteria
- Dialog.Content has role dialog and accessible name 'Suggest What Happens Next'
- Escape and overlay click call onClose
- Closing returns focus to the trigger button


## Scope
- In scope: ContributionSheet.tsx root markup
- In scope: App.tsx trigger
- In scope: styles.css dialog classes
- Out of scope: Validation logic
- Preserve: Props and labels


## Technical constraints
- Keep the component mounted-open controlled via open prop
- Code path: `game/frontend/src/components/ContributionSheet.tsx`
- Code path: `game/frontend/src/App.tsx`
- Code path: `game/frontend/src/styles.css`


## Definition of done
- Component renders through Radix Dialog


## Clarifying questions
- None
