---
id: "01M84MKK2F46SPHH6TD6J50TGN"
kind: requirement
parent: 01M84MKK2FWES7GK0Q0WHFNE4A
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# REQ · UI store exposes sound and settings flags with toggleSound and toggleSettings

Context: header needs sound toggle and settings. Desired behavior: useUiStore exposes soundEnabled (default true) and settingsOpen (default false) with toggleSound and toggleSettings. Expected result: each toggle flips only its own flag. Why: header sound and settings controls share state.

## Acceptance criteria
- Given initial state, when read, then soundEnabled is true and settingsOpen is false
- Given the store, when toggleSound is called, then soundEnabled flips and settingsOpen, drawerOpen and modal are unchanged
- Given the store, when toggleSettings is called, then settingsOpen flips and soundEnabled is unchanged


## Scope
- In scope: soundEnabled, settingsOpen, toggleSound, toggleSettings
- Out of scope: Audio playback
- Out of scope: Settings panel UI
- Preserve: Drawer and modal behavior


## Technical constraints
- Same store as drawer and modal


## Definition of done
- Flags and actions implemented and typed


## Clarifying questions
- None
