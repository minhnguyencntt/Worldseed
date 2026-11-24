---
id: "01M8447V96JXEWFJKP61DT5KN4"
kind: requirement
parent: 01M8447V96QXHVS5N1QX4EJ2EM
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# REQ · Scene view with clickable hotspots, asset path map and action menu

Context: game/src/engine/scene.ts exposes getSceneView and performAction; bedroom.yaml defines bed, bookshelf, desk, old-computer, window, door. Desired behavior: SceneView renders pixel-art placeholder background and a hotspot button per object using a replaceable asset path map; clicking opens ActionMenu with the object's available actions. Expected result: clicking an object and an action updates state. Why: point-and-click gameplay.

## Acceptance criteria
- Given the bedroom scene, When rendered, Then a button named for each object is shown
- Given a hotspot click, When ActionMenu opens, Then it lists the object's action labels
- Given an action click, When pressed, Then onAction is called with objectId and actionId
- Given assets.ts, When a path is changed, Then SceneView uses the new path


## Scope
- In scope: assets.ts, SceneView.tsx, ActionMenu.tsx, placeholder SVG
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
