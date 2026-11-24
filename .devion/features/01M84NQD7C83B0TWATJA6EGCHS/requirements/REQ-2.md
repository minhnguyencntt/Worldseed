---
id: "01M84NQD7C9ASFHTA9BV50NTS6"
kind: requirement
parent: 01M84NQD7C83B0TWATJA6EGCHS
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# REQ · HeaderOverlay sound toggle and settings are wired to useUiStore

Context: uiStore exposes soundEnabled, settingsOpen, toggleSound and toggleSettings. Desired behavior: HeaderOverlay shows a sound button whose icon and aria-pressed reflect soundEnabled and calls toggleSound on click, and a settings button that calls toggleSettings. Expected result: clicking changes store state. Why: header controls must drive shared UI state, not local state.

## Acceptance criteria
- Given soundEnabled true, When the 'Toggle sound' button is clicked, Then store soundEnabled is false and aria-pressed reflects the state
- Given settingsOpen false, When the 'Settings' button is clicked, Then store settingsOpen is true


## Scope
- In scope: Sound and settings buttons in HeaderOverlay
- Out of scope: Settings panel content
- Out of scope: Audio playback
- Preserve: uiStore shape


## Technical constraints
- Use useUiStore selectors; lucide Volume2, VolumeX, Settings icons


## Definition of done
- Controls wired to the real store


## Non-functional requirements
- aria-label on each icon button


## Clarifying questions
- None
