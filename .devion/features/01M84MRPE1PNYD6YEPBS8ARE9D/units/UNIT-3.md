---
id: "01M84MRPE2AT9YXQD0FVYN5D79"
kind: unit
parent: 01M84MRPE2RR28VK18N8KZAM5Q
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Act: Finalize named exports of useUiStore, UiState and ModalId

Confirm uiStore.ts exports useUiStore, UiState and ModalId as named exports so components can import them. Add no default export.

## Acceptance criteria
- Given the module, when imported by name, then useUiStore, UiState and ModalId resolve
- Given tsc --noEmit, when run, then it passes


## Scope
- In scope: Export statements in uiStore.ts
- Out of scope: Tests
- Out of scope: Component wiring
- Preserve: Store behavior


## Technical constraints
- Named exports only
- New file: `game/frontend/src/store/uiStore.ts`


## Definition of done
- Exports resolve and tsc passes


## Clarifying questions
- None
