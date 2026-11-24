---
id: "01M84MKK2G6BREMJ20G4PJ2SD7"
kind: unit
parent: 01M84MKK2FFJSW2HDQ80B3WHM6
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Act: Finalize named exports of useUiStore, UiState and ModalId

Confirm uiStore.ts exports UiState, ModalId and useUiStore by name so selector usage is typed.

## Acceptance criteria
- All three names are exported
- Selector usage type-checks


## Scope
- In scope: game/frontend/src/store/uiStore.ts
- Out of scope: component refactors
- Preserve: store behavior


## Technical constraints
- No default export
- New file: `game/frontend/src/store/uiStore.ts`


## Dependencies
- Act: Add sound and settings flags and toggles to uiStore.ts


## Definition of done
- Exports verified


## Clarifying questions
- None
