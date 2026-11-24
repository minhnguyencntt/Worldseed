---
id: "01M84MKK2FFJSW2HDQ80B3WHM6"
kind: requirement
parent: 01M84MKK2FWES7GK0Q0WHFNE4A
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# REQ · A typed useUiStore hook is exported for components to import

Context: components need a typed entry point. Desired behavior: uiStore.ts exports UiState, ModalId and useUiStore so selector calls like useUiStore(s => s.drawerOpen) are typed. Expected result: importing works under tsc --noEmit. Why: type-safe consumption by later shell work.

## Acceptance criteria
- Given a component, when it calls useUiStore(s => s.soundEnabled), then it renders the current boolean value
- Given the store state changes, when an action runs, then subscribed components re-render with the new value


## Scope
- In scope: Exports of useUiStore, UiState, ModalId
- Out of scope: Refactoring existing components to use it
- Preserve: Existing exports


## Technical constraints
- Named exports only


## Definition of done
- Exports present and typed


## Clarifying questions
- None
