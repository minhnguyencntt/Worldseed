---
id: "01M84MRPE2B4A258F6SE4156Q1"
kind: unit
parent: 01M84MRPE2FK90P215BY9ZCDBY
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Verify: Sound and settings store unit tests

Write unit tests against the real store for soundEnabled and settingsOpen.

## Acceptance criteria
- Given a reset store, when read, then soundEnabled is true and settingsOpen is false
- Given a reset store, when toggleSound is called, then only soundEnabled flips, and toggleSettings flips only settingsOpen


## Scope
- In scope: game/frontend/tests/uiStoreSoundSettings.test.ts
- Out of scope: Product code
- Preserve: Other tests


## Technical constraints
- Vitest


## Definition of done
- Tests pass


## Clarifying questions
- None
