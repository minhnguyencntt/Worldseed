---
id: "01M84MA3R61FT2KNF6R2GKJDVP"
kind: unit
parent: 01M84MA3R6W9H4B5GX84EJTGC0
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Act: Add sound and settings flags and actions to useUiStore

Extend src/store/uiStore.ts with soundEnabled (true), settingsOpen (false), toggleSound, setSoundEnabled and toggleSettings.

## Acceptance criteria
- Given the store, When toggleSound is called, Then soundEnabled is false
- Given the store, When toggleSettings is called, Then settingsOpen is true


## Scope
- In scope: src/store/uiStore.ts
- Out of scope: audio playback
- Preserve: Drawer and modal actions


## Technical constraints
- New file: `game/frontend/src/store/uiStore.ts`


## Dependencies
- ACT1


## Definition of done
- Store compiles with tsc --noEmit


## Clarifying questions
- None
