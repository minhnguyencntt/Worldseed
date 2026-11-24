---
id: "01M84NXPJNCA8EGY8ZRT8TK8VQ"
kind: intent
parent: null
status: draft
links: []
agent: null
source: llm
evidence: {"project_id":"944dfe9c-3760-4ab1-81a3-865a561626d8"}
---
# SG-1.4.2 · Render HeaderOverlay from App through the GameLayout header slot

Context: HeaderOverlay exists (game/frontend/src/components/HeaderOverlay.tsx) with props worldTitle, round, loading, error, but App.tsx still renders RoundBadge and Countdown inside the scene and GameLayout has no header slot. Desired behavior: App fetches the current round, tracks loading and error, and passes a HeaderOverlay into a new GameLayout header slot. Expected result: the header shows round ID, status and countdown, or a loading or an explained error state, and the old RoundBadge and Countdown usage in App is gone. Why: the header must be a compact overlay with explained failure states.

## Acceptance criteria
- Given App is playing and getCurrentRound resolves, when it renders, then the header shows the round id, status and countdown from the HeaderOverlay.
- Given getCurrentRound is pending, when App renders, then the header shows 'Loading round…'.
- Given getCurrentRound rejects with an Error, when App renders, then the header alert shows 'Round unavailable: <message>'.
- Given App is playing, when it renders, then no standalone RoundBadge or Countdown element is rendered outside the header.


## Scope
- In scope: GameLayout header slot
- In scope: App round loading/error state and HeaderOverlay wiring
- In scope: Removal of RoundBadge and Countdown usage from App
- In scope: Unit tests with api client mocked
- Out of scope: Changing HeaderOverlay internals
- Out of scope: Backend or API changes
- Out of scope: Deleting RoundBadge.tsx or Countdown.tsx files
- Preserve: ContributionSheet flow
- Preserve: SceneView, ActionMenu and StoryPanel behavior
- Preserve: Existing drawer behavior of GameLayout


## Technical constraints
- React + TypeScript + Tailwind; use the existing getCurrentRound client and HeaderOverlay component
- Unit tests use vitest with dependencies mocked


## Definition of done
- All requirements implemented and unit tests green


## Clarifying questions
- None
