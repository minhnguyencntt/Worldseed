---
id: "01M84NCYBZ6BG90EMQW86QY19B"
kind: requirement
parent: 01M84NCYBZXA3J18V03QH45F05
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# REQ · HeaderOverlay shows logo, world, round ID, status, countdown, sound toggle and settings from the UI store

Context: no HeaderOverlay exists. Desired behavior: a presentational component taking worldTitle, round (loading|error|ready) and rendering the six elements, with sound and settings buttons bound to useUiStore. Expected result: compact top overlay with accessible buttons. Why: header requirement of the redesign.

## Acceptance criteria
- Given a ready round, when rendered, then StoryForge, world title, round id, status badge and a timer are shown
- Given loading state, when rendered, then text 'Loading round…' is shown and no timer
- Given error state with a message, when rendered, then the message is shown and 'Round unavailable' alone is not
- Given clicks on the Sound and Settings buttons, when the store is read, then soundEnabled and settingsOpen are toggled and aria-pressed reflects state


## Scope
- In scope: src/components/HeaderOverlay.tsx
- Out of scope: Fetching the round
- Preserve: Countdown
- Preserve: RoundBadge


## Technical constraints
- Reuse Countdown and RoundBadge; Lucide Volume2/VolumeX/Settings icons; Button from ./ui/button


## Definition of done
- Component exported and type-checks


## Non-functional requirements
- Buttons have aria-labels


## Clarifying questions
- None
