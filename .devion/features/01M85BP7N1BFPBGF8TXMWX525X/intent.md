---
id: "01M85BP7N1BFPBGF8TXMWX525X"
kind: intent
parent: null
status: draft
links: []
agent: null
source: llm
evidence: {"project_id":"944dfe9c-3760-4ab1-81a3-865a561626d8"}
---
# SG-7 Story Panel and Round status UI with real API integration

Context: StoryPanel lacks the scene title, independent scroll and pixel-art styling. HeaderOverlay shows a bare 'Round unavailable: <msg>' with no retry. Desired behavior: a complete Story Panel and an explained, retryable round status header, both wired to existing state and the existing getCurrentRound client. Expected result: unit tests with the API mocked cover panel rendering, choice clicks and the round loading, success, empty and error states. Why: players need readable story context and a recoverable round status.

## Acceptance criteria
- Given game state, when StoryPanel renders, then it shows the scene title, dialogue, choices, history and inventory
- Given the Round API fails, when the header renders, then it explains the cause and offers a Retry button
- Given Retry is clicked and the API succeeds, when the request resolves, then the header shows round id, status and countdown
- Given no round exists (404), when the header renders, then it shows the distinct empty state, not an error


## Scope
- In scope: StoryPanel
- In scope: HeaderOverlay
- In scope: App round loading
- Out of scope: Backend changes
- Out of scope: Phaser scene
- Out of scope: ContributionSheet
- Preserve: getCurrentRound API contract in game/frontend/src/api/client.ts
- Preserve: useGame state shape
- Preserve: No mock data in production code


## Technical constraints
- React + TypeScript + Tailwind
- Existing Go API client only


## Definition of done
- All requirements verified by unit tests with the API mocked


## Non-functional requirements
- Story panel scrolls independently without page scroll


## Clarifying questions
- None
