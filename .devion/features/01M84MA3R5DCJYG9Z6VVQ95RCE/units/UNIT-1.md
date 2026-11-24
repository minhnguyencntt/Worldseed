---
id: "01M84MA3R67EWCWBY4A1E112ZP"
kind: unit
parent: 01M84MA3R5A9DSS9762ZFN3X1D
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Act: Add zustand and create useUiStore with drawer and modal state

Add zustand to package.json dependencies and create src/store/uiStore.ts exporting useUiStore with drawerOpen, activeModal and their actions.

## Acceptance criteria
- Given the file, When imported, Then useUiStore is exported
- Given toggleDrawer, When called, Then drawerOpen flips


## Scope
- In scope: package.json
- In scope: src/store/uiStore.ts
- Out of scope: GameLayout changes
- Preserve: Other dependencies


## Technical constraints
- zustand ^4.5.0
- Code path: `game/frontend/package.json`
- New file: `game/frontend/src/store/uiStore.ts`


## Definition of done
- Store compiles with tsc --noEmit


## Clarifying questions
- None
