---
id: "01M8601M7B37JZT6FAR2FFGQRZ"
kind: intent
parent: null
status: draft
links: []
agent: null
source: llm
evidence: {"project_id":"944dfe9c-3760-4ab1-81a3-865a561626d8"}
---
# SG-7 Integrate the game screen, behaviours and responsive layout

Context: header, 480x270 scene and story panel already exist, but GameLayout splits 4fr/1fr (80/20), App never emits playAnimation or transitionTo to Phaser, BootScene.transitionTo does not ignore empty or unknown scene ids, and styles.css still holds placeholder .contribution-sheet styling. Desired behaviour: the delivered game screen matches the SG-7 Done when. Expected result: layout, behaviours and styles are wired to the real entry point and unit tested. Why: the visual overhaul needs one integrated screen.

## Acceptance criteria
- Given a wide viewport, when the game screen renders, then the grid is about three quarters scene and one quarter panel
- Given a narrow viewport, when the Story button is clicked, then the panel drawer toggles via uiStore
- Given a game action, when it runs, then playAnimation interact is emitted for the boy
- Given a valid scene change, when state.currentScene changes, then transitionTo is emitted and the camera fades
- Given an empty or unknown scene id, when transitionTo arrives, then the scene is ignored
- Given styles.css, when read, then no placeholder styling remains


## Scope
- In scope: GameLayout split
- In scope: App action emissions
- In scope: BootScene transitionTo guard
- In scope: styles.css placeholder removal
- In scope: unit tests
- Out of scope: new rooms
- Out of scope: story content
- Out of scope: backend changes
- Out of scope: audio
- Out of scope: deployment
- Out of scope: repository clean-up
- Preserve: Phaser 3.90.x
- Preserve: Go API contracts and contribution flow
- Preserve: data-driven scenes
- Preserve: 480x270 whole-number scale
- Preserve: 48-colour palette


## Technical constraints
- Phaser stays on 3.90.x; React, TypeScript, Vite, Tailwind, Radix, Zustand stay
- Tests are unit tests with all dependencies mocked
- Do not read .devion/worktrees


## Definition of done
- All requirements delivered with passing unit tests


## Non-functional requirements
- Layout holds from 1280x720 up


## Clarifying questions
- None
