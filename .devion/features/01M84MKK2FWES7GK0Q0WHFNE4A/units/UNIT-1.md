---
id: "01M84MKK2FH270TFP0ZVZM9BZA"
kind: unit
parent: 01M84MKK2FXX0RTPWXMGT7KW1G
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Act: Create uiStore.ts with drawer and modal state and actions

Create game/frontend/src/store/uiStore.ts using zustand create with the UiState type holding drawer and modal fields and actions.

## Acceptance criteria
- uiStore.ts exists and exports useUiStore
- Drawer and modal actions behave per REQ1


## Scope
- In scope: game/frontend/src/store/uiStore.ts
- Out of scope: sound and settings
- Preserve: Other src files


## Technical constraints
- zustand v5 create<UiState>()((set) => ...)
- New file: `game/frontend/src/store/uiStore.ts`


## Definition of done
- File compiles


## Clarifying questions
- None
