---
id: "01M8447V97WVKR68CF1KRB6QSH"
kind: requirement
parent: 01M8447V96QXHVS5N1QX4EJ2EM
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# REQ · 80/20 layout with independent story scroll and mobile bottom drawer

Context: components from R2 and R3 exist. Desired behavior: GameLayout renders scene at 80% and story panel at 20% with its own overflow scroll; below a 768px breakpoint the panel becomes a bottom drawer with a toggle button (aria-expanded) while ActionMenu stays in the scene area. App wires useGame, SceneView, ActionMenu, StoryPanel and IntroScreen. Expected result: playable on desktop and mobile. Why: responsive requirement.

## Acceptance criteria
- Given the layout renders, When drawer toggle is clicked, Then aria-expanded becomes 'true'
- Given the drawer is open, When toggle is clicked again, Then aria-expanded becomes 'false'
- Given the drawer is closed, When rendered, Then the action menu remains in the document
- Given styles.css, When read, Then story panel has overflow-y auto and a max-width 768px media query


## Scope
- In scope: GameLayout.tsx, App.tsx, main.tsx, index.html, styles.css
- Out of scope: Contribution form and 'Suggest What Happens Next' flow
- Out of scope: Backend API calls
- Out of scope: Round countdown and admin UI
- Preserve: game/src/** engine, systems and state modules unchanged
- Preserve: game/content/** YAML unchanged


## Technical constraints
- Vite + React + TypeScript under game/frontend/
- Reuse game/src runtime via imports; do not copy it


## Definition of done
- Acceptance criteria demonstrated by unit tests


## Clarifying questions
- None
