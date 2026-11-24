---
id: "01M84KNPXBHVAH7JMHQB7WTYX0"
kind: requirement
parent: 01M84KNPXA9140V7Y55SNW8BJG
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# REQ · A compact header overlay shows logo, world, round state, countdown, sound toggle and settings

Context: RoundBadge and Countdown render loose inside the scene; no logo, world name, round ID, sound or settings controls; a failed round API shows only 'Round unavailable'. Desired behavior: HeaderOverlay absolutely positioned at the top of the scene shows a Lucide logo with StoryForge text, world name, round ID, RoundBadge, Countdown, a sound toggle (Volume2/VolumeX) bound to soundEnabled and a settings button that sets settingsOpen; with a round error it shows the failure message. Why: required compact header and explained errors.

## Acceptance criteria
- Given a round, when HeaderOverlay renders, then it shows StoryForge, the world name, the round id, the status and a countdown
- Given the sound toggle clicked, when the store is read, then soundEnabled flips and aria-pressed matches
- Given the settings button clicked, when the store is read, then settingsOpen is true
- Given an error prop and no round, when rendered, then the error message text is visible instead of a bare 'Round unavailable'
- Given App rendered after Begin, when inspected, then HeaderOverlay is present and the Suggest button opens via the store modal


## Scope
- In scope: HeaderOverlay.tsx, App.tsx composition, RoundBadge unchanged
- Out of scope: settings dialog content
- Out of scope: audio playback
- Preserve: Countdown and RoundBadge components
- Preserve: ContributionSheet props
- Preserve: getCurrentRound call


## Technical constraints
- Lucide icons; Motion fade-in; Tailwind


## Dependencies
- REQ2
- REQ3


## Definition of done
- Header visible in the shell


## Non-functional requirements
- Buttons have aria-labels


## Clarifying questions
- None
