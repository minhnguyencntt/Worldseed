---
id: "01M84MRPE2RR28VK18N8KZAM5Q"
kind: requirement
parent: 01M84MRPE1PNYD6YEPBS8ARE9D
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# REQ · A typed useUiStore hook and UiState types are exported for components

Context: components import state through a hook. Desired behavior: uiStore.ts exports useUiStore (a typed Zustand hook accepting selectors), plus the UiState and ModalId types. Expected result: a component can call useUiStore(s => s.drawerOpen) with type inference. Why: typed, selector-based access avoids unneeded re-renders.

## Acceptance criteria
- Given import { useUiStore } from the store module, when called with a selector s => s.soundEnabled, then it returns a boolean
- Given the module, when its exports are inspected, then useUiStore is a function with getState and setState
- Given tsc --noEmit, when run, then the store compiles without type errors


## Scope
- In scope: Named exports useUiStore, UiState, ModalId
- Out of scope: Component wiring
- Preserve: Existing tsconfig


## Technical constraints
- Named exports only


## Definition of done
- Exports are typed and the type-check passes


## Clarifying questions
- None
