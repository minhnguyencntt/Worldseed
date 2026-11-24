---
id: "01M844GYQJMA8X5WH36P11E3RQ"
kind: unit
parent: 01M844GYQJKSFBQC069PMYP5R3
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Act: Compose the playing view in App

Edit App.tsx so the post-Begin branch renders GameLayout with SceneView plus ActionMenu as scene and StoryPanel as story, driven by useGame and a selectedId state.

## Acceptance criteria
- Given Begin clicked, then hotspots, Story toggle and dialogue render
- Given a hotspot click and action, then history updates
- Given a dialogue choice click, then it is recorded in history


## Scope
- In scope: game/frontend/src/App.tsx
- Out of scope: Other components
- Preserve: Intro gate


## Technical constraints
- Hooks must be called before the early return, so call useGame() and the selectedId useState at the top of App
- New file: `game/frontend/src/App.tsx`


## Dependencies
- A1


## Definition of done
- Playing view renders and typechecks


## Clarifying questions
- None
