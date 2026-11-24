---
id: "01M84MRPE1PNYD6YEPBS8ARE9D"
kind: intent
parent: null
status: draft
links: []
agent: null
source: llm
evidence: {"project_id":"944dfe9c-3760-4ab1-81a3-865a561626d8"}
---
# SG-1.2.2 · Create the typed UI store in game/frontend/src/store

Context: game/frontend has zustand declared in package.json but no src/store directory exists. Desired behavior: src/store/uiStore.ts exports a Zustand store holding drawer open state, modal state, sound-enabled and settings flags, with toggleDrawer, openModal, closeModal, toggleSound and toggleSettings actions, exposed through a typed useUiStore hook. Expected result: components can import useUiStore, and unit tests exercise the real store module. Why: the shell, header and contribution modal need shared UI state.

## Acceptance criteria
- Given the module src/store/uiStore.ts, when imported, then it exports a typed useUiStore hook
- Given the store, when each of toggleDrawer, openModal, closeModal, toggleSound and toggleSettings is called, then the matching state changes
- Given the unit tests, when they run, then they import the real store and mock nothing from it


## Scope
- In scope: game/frontend/src/store/uiStore.ts
- In scope: Unit tests for the store
- Out of scope: Wiring the store into components
- Out of scope: Backend changes
- Preserve: Existing components and tests
- Preserve: zustand dependency in package.json


## Technical constraints
- Zustand ^5.1.0
- TypeScript
- Vitest tests under game/frontend/tests/**/*.test.ts


## Definition of done
- Store and tests are committed together
- Targeted tests pass


## Clarifying questions
- None
