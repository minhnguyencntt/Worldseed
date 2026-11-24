---
id: "01M84MRPE211Z30E5842C3HP7X"
kind: unit
parent: 01M84MRPE2RR28VK18N8KZAM5Q
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Verify: Typed useUiStore hook export unit tests

Test the named export and its use from a React component through a selector, using the real store.

## Acceptance criteria
- Given the module, when imported, then useUiStore is a function exposing getState and setState
- Given a component using useUiStore(s => s.soundEnabled), when toggleSound is called inside act, then the rendered text updates


## Scope
- In scope: game/frontend/tests/uiStoreHook.test.tsx
- Out of scope: Product code
- Preserve: Other tests


## Technical constraints
- @testing-library/react


## Definition of done
- Tests pass


## Clarifying questions
- None
