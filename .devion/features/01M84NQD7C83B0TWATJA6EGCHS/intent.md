---
id: "01M84NQD7C83B0TWATJA6EGCHS"
kind: intent
parent: null
status: draft
links: []
agent: null
source: llm
evidence: {"project_id":"944dfe9c-3760-4ab1-81a3-865a561626d8"}
---
# SG-1.4.1 · Create the HeaderOverlay component wired to the UI store

Context: game/frontend has no HeaderOverlay yet. App.tsx renders RoundBadge (which shows a bare 'Round unavailable' on failure) and Countdown directly. Desired behavior: a HeaderOverlay component takes props worldTitle, round, loading and error and shows the logo, world name, round ID, status, countdown, sound toggle and settings button, wired to useUiStore, with loading, empty and error states that explain a round API failure. Expected result: a tested, standalone component. Why: the compact header and honest round-failure messaging are required by the StoryForge redesign.

## Acceptance criteria
- Given a round, When HeaderOverlay renders, Then logo, world title, round ID, status, countdown, sound toggle and settings button are visible
- Given the sound toggle and settings button are clicked, When the store is read, Then soundEnabled and settingsOpen have flipped
- Given loading, no round, or an error, When HeaderOverlay renders, Then a loading, empty or error message is shown, and the error message explains the failure


## Scope
- In scope: New HeaderOverlay.tsx in game/frontend/src/components
- In scope: Use of existing useUiStore, Countdown and lucide-react icons
- Out of scope: Composing HeaderOverlay into App or GameLayout
- Out of scope: Backend changes
- Out of scope: Changing uiStore
- Preserve: Existing Countdown and RoundBadge behavior and tests
- Preserve: uiStore state shape and actions
- Preserve: API client contracts


## Technical constraints
- React + TypeScript + Tailwind classes; lucide-react icons; Button from components/ui/button
- State read via useUiStore selectors from src/store/uiStore.ts
- Round type comes from src/api/client.ts


## Definition of done
- HeaderOverlay exported from game/frontend/src/components/HeaderOverlay.tsx
- All requirement Verify units pass


## Non-functional requirements
- Accessible names on icon buttons


## Clarifying questions
- None
