---
id: "01M84MRPE2FK90P215BY9ZCDBY"
kind: requirement
parent: 01M84MRPE1PNYD6YEPBS8ARE9D
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# REQ · UI store holds sound and settings flags with toggleSound and toggleSettings

Context: the header needs sound and settings controls. Desired behavior: the store has soundEnabled (default true) and settingsOpen (default false), with toggleSound and toggleSettings. Expected result: each toggle flips only its own flag. Why: the header sound button and settings control depend on this state.

## Acceptance criteria
- Given a fresh store, when read, then soundEnabled is true and settingsOpen is false
- Given the store, when toggleSound is called, then soundEnabled flips and settingsOpen is unchanged
- Given the store, when toggleSettings is called, then settingsOpen flips and soundEnabled is unchanged


## Scope
- In scope: soundEnabled
- In scope: settingsOpen
- In scope: toggleSound
- In scope: toggleSettings
- Out of scope: Audio playback
- Out of scope: Settings panel UI
- Preserve: Drawer and modal state


## Technical constraints
- Same store as REQ1


## Definition of done
- Flags and toggles exist and are typed


## Clarifying questions
- None
