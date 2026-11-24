---
id: "01M844TV9QXFQ8S1DRSJEPHJ1H"
kind: intent
parent: null
status: draft
links: []
agent: null
source: llm
evidence: {"project_id":"944dfe9c-3760-4ab1-81a3-865a561626d8"}
---
# SG-3.3 · Unit tests with mocked dependencies for the App flow

Context: game/frontend/src/App.tsx composes IntroScreen, GameLayout, SceneView, ActionMenu and StoryPanel on top of useGame, which persists state through runtime/storage (readSaved/writeSaved). tests/app.test.tsx already renders the real stack with jsdom localStorage and covers the intro gate and basic clicks. Desired behavior: a dedicated App flow test file in which the storage dependency is replaced by an in-memory fake and the three flows are asserted. Expected result: green, fast unit tests proving the click-to-menu, action/choice-to-story and remount-restore flows. Why: guard the playable loop against regressions.

## Acceptance criteria
- Given the App is begun, when a hotspot is clicked, then the action menu for that object shows its description and action buttons
- Given the action menu is open, when an action is chosen, then the story history shows the action's text
- Given the opening dialogue, when a choice is clicked, then the dialogue closes and history records the choice text
- Given a state saved through the mocked storage, when App is unmounted and remounted and Begin is clicked, then the saved story and open-door state are restored


## Scope
- In scope: New App flow unit test file with a mocked runtime/storage module
- In scope: Minimal accessibility seams in ActionMenu and StoryPanel needed by the tests
- Out of scope: Backend changes
- Out of scope: Browser or e2e tests
- Out of scope: Persisting the intro-gate state
- Preserve: Existing tests/app.test.tsx behavior
- Preserve: useGame and storage public signatures
- Preserve: Hotspot data-open semantics


## Technical constraints
- Vitest + @testing-library/react in jsdom, as configured in game/frontend/vitest.config.ts
- Dependencies mocked with vi.mock; no real network or browser


## Definition of done
- All three flows covered by passing unit tests
- Typecheck passes


## Non-functional requirements
- Tests finish in seconds


## Clarifying questions
- None
