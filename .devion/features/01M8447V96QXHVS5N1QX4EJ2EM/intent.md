---
id: "01M8447V96QXHVS5N1QX4EJ2EM"
kind: intent
parent: null
status: draft
links: []
agent: null
source: llm
evidence: {"project_id":"944dfe9c-3760-4ab1-81a3-865a561626d8"}
---
# SG-3 · Build playable 80/20 game frontend

Context: game/ holds a pure runtime (performAction, chooseOption, serializeState) and bedroom content, but no UI exists. Desired behavior: a Vite React TS app in game/frontend/ (placed under the existing game/ top-level folder) renders scene, hotspots, action menu, dialogue, choices, history and inventory in an 80/20 layout with a mobile drawer, persisting state to localStorage safely. Expected result: a player can play the opening scene. Why: first playable milestone.

## Acceptance criteria
- Given the app loads, When there is no history, Then the intro copy 'Every great adventure begins with a question.' is shown
- Given a hotspot is clicked, When an action is chosen, Then game state updates and persists
- Given storage throws, When the app runs, Then play continues in memory
- Given a narrow viewport, When the drawer toggle is pressed, Then the story panel opens and collapses


## Scope
- In scope: game/frontend/ app and tests
- Out of scope: Contribution form and 'Suggest What Happens Next' flow
- Out of scope: Backend API calls
- Out of scope: Round countdown and admin UI
- Preserve: game/src/** engine, systems and state modules unchanged
- Preserve: game/content/** YAML unchanged


## Technical constraints
- Vite + React + TypeScript under game/frontend/
- Reuse game/src runtime via imports; do not copy it


## Definition of done
- All four requirements completed with Act, Verify and Evidence


## Clarifying questions
- None
