---
id: "01M844GYQHQVB6ZB4VWCQENPDN"
kind: intent
parent: null
status: draft
links: []
agent: null
source: llm
evidence: {"project_id":"944dfe9c-3760-4ab1-81a3-865a561626d8"}
---
# SG-3.1 · Create the missing top-level App component

Context: game/frontend/src/main.tsx imports './App', but App.tsx does not exist. The pieces already exist: useGame, IntroScreen, SceneView, ActionMenu, StoryPanel and GameLayout. Desired behavior: App uses useGame to show IntroScreen first, then SceneView, ActionMenu and StoryPanel inside GameLayout. Expected result: the entry point compiles and the opening bedroom scene can be played. Why: this is the missing top-level piece for the playable 80/20 frontend.

## Acceptance criteria
- Given the app starts, when App renders, then the intro copy and a Begin button are shown and no scene hotspots are present
- Given the intro is shown, when Begin is clicked, then the bedroom scene with hotspot buttons, the story panel with the boy's opening dialogue, and the Story drawer toggle are rendered
- Given the scene is shown, when a hotspot is clicked and an action button is pressed, then the game state changes and the result appears in the story history


## Scope
- In scope: game/frontend/src/App.tsx composing existing components with useGame
- Out of scope: Community contribution UI
- Out of scope: Backend APIs
- Out of scope: Changes to existing components, useGame or the engine
- Preserve: main.tsx import of './App' as default export
- Preserve: GameLayout, useGame and component props as they are


## Technical constraints
- React 18 + TypeScript; default export App
- Reuse components in game/frontend/src/components and useGame from src/runtime/useGame.ts
- Use getActiveNode from @game/systems/dialogue (alias already configured)


## Definition of done
- App.tsx exists and tsc --noEmit passes
- Opening scene is playable through intro, hotspot, action and dialogue choice


## Clarifying questions
- None
