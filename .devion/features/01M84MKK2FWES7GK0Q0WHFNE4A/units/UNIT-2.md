---
id: "01M84MKK2FY1XYT6E8DQRMGCS9"
kind: unit
parent: 01M84MKK2F46SPHH6TD6J50TGN
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Act: Add sound and settings flags and toggles to uiStore.ts

Add sound and settings fields and actions to the store created in uiStore.ts.

## Acceptance criteria
- soundEnabled defaults true, settingsOpen defaults false
- Toggles flip only their own flag


## Scope
- In scope: game/frontend/src/store/uiStore.ts
- Out of scope: audio playback
- Preserve: drawer and modal members


## Technical constraints
- Same store
- New file: `game/frontend/src/store/uiStore.ts`


## Dependencies
- Act: Create uiStore.ts with drawer and modal state and actions


## Definition of done
- Fields and actions compile


## Clarifying questions
- None
