---
id: "01M85GXTM3H8Y9645Y5MTNZP9B"
kind: unit
parent: 01M85GXTM3SFQ205GX4ERCQ18B
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Act: Render PhaserHost with BootScene in the App scene slot

Edit game/frontend/src/App.tsx so the GameLayout scene slot mounts PhaserHost with BootScene instead of SceneView, keeping ActionMenu, the Suggest button and ContributionSheet.

## Acceptance criteria
- Given Begin is clicked, when App renders, then PhaserHost is rendered and SceneView is not.
- Given the App file is read, when imports are inspected, then SceneView is no longer imported by App.tsx.


## Scope
- In scope: game/frontend/src/App.tsx imports and scene slot JSX
- Out of scope: Tests
- Out of scope: SceneView.tsx deletion
- Preserve: Other App props, state and handlers


## Technical constraints
- PhaserHost and BootScene are existing exports
- Code path: `game/frontend/src/App.tsx`


## Definition of done
- App.tsx compiles with tsc --noEmit
- No SceneView usage in App.tsx


## Clarifying questions
- None
