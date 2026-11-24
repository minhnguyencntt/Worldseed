---
id: "01M844TV9Q2EB912YVFDDXVRMY"
kind: unit
parent: 01M844TV9QSM531W5EP6MNP6B2
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Act: Expose object id on the ActionMenu root

Add data-object-id={object.id} to the ActionMenu root section so the open menu is identifiable by object.

## Acceptance criteria
- Given an object, when ActionMenu renders, then the section has data-object-id equal to object.id
- Given object undefined, when ActionMenu renders, then it still returns null


## Scope
- In scope: ActionMenu.tsx
- Out of scope: Styles
- Preserve: aria-label
- Preserve: props


## Technical constraints
- Code path: `game/frontend/src/components/ActionMenu.tsx`


## Dependencies
- R1


## Definition of done
- Attribute rendered on the menu section


## Clarifying questions
- None
