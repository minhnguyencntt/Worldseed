---
id: "01M84MA3R6B7ZG3VDVWPV04X9T"
kind: unit
parent: 01M84MA3R6W9H4B5GX84EJTGC0
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Verify: Sound and settings store unit tests

Add tests to tests/uiStore.test.ts for sound and settings flags.

## Acceptance criteria
- Given a reset store, When read, Then soundEnabled is true and settingsOpen false
- Given a reset store, When toggleSound and toggleSettings run, Then soundEnabled false and settingsOpen true


## Scope
- In scope: tests/uiStore.test.ts
- Out of scope: browser
- Preserve: Existing drawer tests


## Dependencies
- ACT2


## Definition of done
- Tests pass


## Clarifying questions
- None
