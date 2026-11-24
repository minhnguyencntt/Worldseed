---
id: "01M84MA3R5DCJYG9Z6VVQ95RCE"
kind: intent
parent: null
status: draft
links: []
agent: null
source: llm
evidence: {"project_id":"944dfe9c-3760-4ab1-81a3-865a561626d8"}
---
# SG-1.2 · Create the Zustand UI store for drawer, modal, sound and settings

Context: game/frontend has no Zustand dependency and no store. GameLayout keeps drawerOpen in local useState. Desired behavior: a single importable store holds drawer, modal, sound and settings flags with actions such as toggleDrawer. Expected result: components can import useUiStore from game/frontend/src/store/uiStore.ts. Why: the shell needs shared UI state without prop drilling.

## Acceptance criteria
- Given the frontend module, When a component imports useUiStore from src/store/uiStore, Then it resolves and type-checks
- Given the store, When toggleDrawer is called, Then drawerOpen flips between false and true


## Scope
- In scope: zustand dependency
- In scope: src/store/uiStore.ts
- Out of scope: Rewiring GameLayout or HeaderOverlay to the store
- Out of scope: Phaser integration
- Preserve: Existing GameLayout behavior
- Preserve: Existing tests


## Technical constraints
- Zustand is the mandated state library
- Store lives in game/frontend/src


## Definition of done
- Store file exists and is importable
- Store unit tests pass


## Clarifying questions
- None
