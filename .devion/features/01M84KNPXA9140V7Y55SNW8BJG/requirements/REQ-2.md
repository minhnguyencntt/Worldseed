---
id: "01M84KNPXBTJTMK9Y6AKKFC9R3"
kind: requirement
parent: 01M84KNPXA9140V7Y55SNW8BJG
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# REQ · A Zustand store holds drawer, modal, sound and settings UI state

Context: drawer state is local useState in GameLayout and the contribution sheet flag is local in App. Desired behavior: one Zustand store useUiStore owns drawerOpen, modal ('contribution'|'settings'|null), soundEnabled and settingsOpen with actions. Why: Phaser and React must share UI state without duplicated ownership.

## Acceptance criteria
- Given the initial store, when read, then drawerOpen false, modal null, soundEnabled true, settingsOpen false
- Given toggleDrawer called twice, when read, then drawerOpen is true then false
- Given openModal('contribution') then closeModal, when read, then modal is 'contribution' then null
- Given toggleSound called, when read, then soundEnabled is false
- Given setSettingsOpen(true), when read, then settingsOpen is true


## Scope
- In scope: game/frontend/src/store/uiStore.ts
- Out of scope: game state (stays in useGame)
- Preserve: useGame


## Technical constraints
- Zustand


## Definition of done
- Store exported with types


## Clarifying questions
- None
