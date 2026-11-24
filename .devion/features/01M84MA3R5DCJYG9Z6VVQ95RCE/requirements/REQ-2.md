---
id: "01M84MA3R6W9H4B5GX84EJTGC0"
kind: requirement
parent: 01M84MA3R5DCJYG9Z6VVQ95RCE
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# REQ · Sound and settings flags with actions in the UI store

Context: header needs sound toggle and settings. Desired behavior: store holds soundEnabled (default true) and settingsOpen (default false) with toggleSound, setSoundEnabled and toggleSettings. Expected result: flags change via actions. Why: header sound toggle and settings need shared state.

## Acceptance criteria
- Given a fresh store, When read, Then soundEnabled is true and settingsOpen is false
- Given a fresh store, When toggleSound is called, Then soundEnabled is false
- Given a fresh store, When toggleSettings is called, Then settingsOpen is true


## Scope
- In scope: sound and settings state/actions
- Out of scope: audio playback
- Out of scope: settings UI
- Preserve: Drawer and modal state


## Technical constraints
- Same store file as REQ1


## Dependencies
- REQ1


## Definition of done
- Sound and settings actions implemented


## Clarifying questions
- None
