---
id: "01M84MRPE2G9P3R0SVMYJSK59P"
kind: unit
parent: 01M84MRPE2FK90P215BY9ZCDBY
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Act: Add sound and settings flags and toggles to uiStore.ts

Extend the UiState interface and the store created by ACT1 with soundEnabled, settingsOpen, toggleSound and toggleSettings.

## Acceptance criteria
- Given the store, when read, then soundEnabled is true and settingsOpen is false
- Given the toggles, when called, then only their own flag flips


## Scope
- In scope: Edit uiStore.ts
- Out of scope: Tests
- Preserve: Drawer and modal members


## Technical constraints
- Same create call
- New file: `game/frontend/src/store/uiStore.ts`


## Definition of done
- Flags and actions present


## Clarifying questions
- None
