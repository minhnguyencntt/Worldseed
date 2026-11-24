---
id: "01M84MX32EZVQDSR0N94BTQ8B0"
kind: intent
parent: null
status: draft
links: []
agent: null
source: llm
evidence: {"project_id":"944dfe9c-3760-4ab1-81a3-865a561626d8"}
---
# SG-1.2.3 · Unit tests for the real UI store covering defaults and each action

Context: game/frontend/src/store/uiStore.ts exports the zustand store useUiStore with drawerOpen, modal, soundEnabled, settingsOpen and the actions toggleDrawer, openModal, closeModal, toggleSound and toggleSettings. Tests exist in three files, each covering part of the store. Desired behavior: one unit-test suite asserts the complete default state and every action, and proves the tests import the actual store module rather than a mock of it. Why: closes sub-goal SG-1.2.3.

## Acceptance criteria
- Given a freshly reset store, when state is read, then drawerOpen=false, modal=null, soundEnabled=true, settingsOpen=false and all five actions are functions.
- Given the real store, when each of toggleDrawer, openModal, closeModal, toggleSound and toggleSettings runs, then the matching state field changes as specified and unrelated fields stay unchanged.
- Given the test suite, when it runs, then it imports ../src/store/uiStore directly with no vi.mock of that module and asserts the imported hook is not a mock function.


## Scope
- In scope: New unit tests under game/frontend/tests for useUiStore
- Out of scope: Changing store behavior
- Out of scope: Component tests
- Out of scope: Backend
- Preserve: Existing uiStore*.test.ts files
- Preserve: uiStore.ts public API


## Technical constraints
- Vitest 2 with jsdom; tests live in game/frontend/tests/**/*.test.{ts,tsx} per vitest.config.ts
- Reset state with useUiStore.setState(useUiStore.getInitialState(), true)
- Unit tests only: no browser, server or live ports


## Definition of done
- New test file passes
- Tests import the real store, never a mock of it


## Clarifying questions
- None
