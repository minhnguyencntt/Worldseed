---
id: "01M85XYJFJR8B71Q5VBGPRKMNR"
kind: intent
parent: null
status: draft
links: []
agent: null
source: llm
evidence: {"project_id":"944dfe9c-3760-4ab1-81a3-865a561626d8"}
---
# SG-5.1 Rebuild HeaderOverlay on the kit

Context: HeaderOverlay (game/frontend/src/components/HeaderOverlay.tsx) already shows StoryForge, the world title, round id, status, Countdown, a Retry button on error, and sound and settings buttons wired to useUiStore. It is unstyled text inside .sf-frame-bar. The Suggest What Happens Next button is a separate frame button in App.tsx. Desired behavior: the header shows a gold logo, a world-name plaque, a status pill with dot and round id, the countdown, a gold + SUGGEST WHAT HAPPENS NEXT button that opens the contribution dialog, and sound and settings icons. Expected result: the header reads real round data and the old standalone Suggest button is gone. Why: the SG-5 goal replaces the placeholder look with the framed interface.

## Acceptance criteria
- Given a loaded round, when the header renders, then it shows the logo, the world-name plaque, a status pill containing a status dot, the round id and the status, and the countdown timer.
- Given the header is rendered, when the player clicks the gold suggest button, then the contribution dialog opens.
- Given the round is loading, failed or missing, when the header renders, then the pill shows the loading, error with Retry, or no-active-round state.
- Given the header is rendered, when the player clicks the sound or settings icon, then uiStore soundEnabled or settingsOpen changes.


## Scope
- In scope: HeaderOverlay layout and styling on the frame kit
- In scope: gold suggest button inside the header
- In scope: status pill with dot
- In scope: header tests
- Out of scope: StoryPanel (SG-5.2)
- Out of scope: new art
- Out of scope: backend changes
- Out of scope: audio
- Preserve: Round and error props of HeaderOverlay
- Preserve: uiStore actions
- Preserve: ContributionSheet flow and focus return
- Preserve: Countdown behavior


## Technical constraints
- Phaser stays on 3.90.x; React, TypeScript, Vite, Tailwind, Radix and Zustand stay.
- Keep the Go API contracts and the contribution flow; no mock data in place of real API calls.
- Colours come from the shared palette tokens; fonts are bundled npm packages; no downloaded art or CDN links.
- Tests are unit tests with all dependencies mocked.


## Definition of done
- All requirements are done and their Verify units pass.


## Non-functional requirements
- Keyboard operable buttons with accessible names


## Clarifying questions
- None
