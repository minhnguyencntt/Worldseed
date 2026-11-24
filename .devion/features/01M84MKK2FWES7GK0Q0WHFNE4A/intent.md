---
id: "01M84MKK2FWES7GK0Q0WHFNE4A"
kind: intent
parent: null
status: draft
links: []
agent: null
source: llm
evidence: {"project_id":"944dfe9c-3760-4ab1-81a3-865a561626d8"}
---
# SG-1.2.2 · Create the typed UI store in game/frontend/src/store

Context: game/frontend has zustand ^5.1.0 declared (SG-1.2.1) but no src/store directory exists. Desired behavior: a Zustand UI store holds drawer open state, modal state, sound enabled and settings flags, with actions toggleDrawer, openModal, closeModal, toggleSound and toggleSettings, exported as a typed hook. Expected result: components can import useUiStore. Why: the shell, header and contribution modal share UI state.

## Acceptance criteria
- Given the module src/store/uiStore.ts, when imported, then it exports a typed useUiStore hook and a UiState type
- Given the store, when each action is called, then drawer, modal, sound and settings state change as specified


## Scope
- In scope: game/frontend/src/store/uiStore.ts
- In scope: unit tests in game/frontend/tests
- Out of scope: Wiring the store into GameLayout, HeaderOverlay or App
- Out of scope: Persisting UI state
- Out of scope: Phaser integration
- Preserve: Existing components and tests
- Preserve: zustand dependency declaration


## Technical constraints
- Use zustand ^5.1.0 create() with TypeScript types
- Tests live in game/frontend/tests and match tests/**/*.test.{ts,tsx}


## Definition of done
- uiStore.ts exists and type-checks
- Unit tests pass


## Clarifying questions
- None
