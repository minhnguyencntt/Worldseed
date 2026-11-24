---
id: "01M84P4G704X765C52M5D0C5GK"
kind: intent
parent: null
status: draft
links: []
agent: null
source: llm
evidence: {"project_id":"944dfe9c-3760-4ab1-81a3-865a561626d8"}
---
# SG-1.4.2 · Render HeaderOverlay from App through the GameLayout header slot

Context: App.tsx currently renders RoundBadge and Countdown directly inside the scene and silently swallows getCurrentRound failures with .catch(() => setRound(undefined)). HeaderOverlay already exists with loading, error and empty states, but nothing renders it, and GameLayout has no header slot. Desired behavior: GameLayout takes an optional header prop shown as a compact overlay in the game area. App passes HeaderOverlay into it with the round, loading and error state from the existing round fetch. Expected result: the header explains round API failures, and no standalone badge or countdown remains. Why: the redesign requires a compact header overlay with proper loading, empty and error states.

## Acceptance criteria
- Given GameLayout receives a header prop, when it renders, then the header node appears inside the main game area
- Given the round fetch is pending, when App is in the playing view, then the header shows 'Loading round…'
- Given getCurrentRound rejects, when App is in the playing view, then the header shows an alert containing the failure message
- Given the playing view, when App renders, then no standalone RoundBadge or Countdown is rendered outside HeaderOverlay


## Scope
- In scope: GameLayout header slot prop
- In scope: App wiring of HeaderOverlay and round loading/error state
- In scope: Removing RoundBadge and Countdown usage from App
- In scope: Unit tests with dependencies mocked
- Out of scope: Changing HeaderOverlay internals
- Out of scope: Backend or API changes
- Out of scope: Deleting the RoundBadge or Countdown component files (Countdown is still used by HeaderOverlay)
- Preserve: GameLayout 80/20 grid and mobile drawer behavior
- Preserve: ContributionSheet flow and SceneView/ActionMenu behavior
- Preserve: getCurrentRound API contract


## Technical constraints
- React + TypeScript + Vite, Tailwind classes, Zustand useUiStore
- Use the existing getCurrentRound from src/api/client.ts; no mock data in product code


## Definition of done
- All three requirements implemented and their unit tests pass


## Clarifying questions
- None
