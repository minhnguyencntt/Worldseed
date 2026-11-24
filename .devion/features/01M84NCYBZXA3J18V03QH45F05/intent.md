---
id: "01M84NCYBZXA3J18V03QH45F05"
kind: intent
parent: null
status: draft
links: []
agent: null
source: llm
evidence: {"project_id":"944dfe9c-3760-4ab1-81a3-865a561626d8"}
---
# SG-1.4 · Compact header overlay wired to the UI store with Tailwind layout tests

Context: GameLayout is already Tailwind-based and useUiStore holds soundEnabled and settingsOpen, but App renders a bare RoundBadge and Countdown inside the scene and shows 'Round unavailable' when the API fails, with no explanation. Desired behavior: a compact header overlay shows logo, world name, round ID, status, countdown, sound toggle and settings, wired to useUiStore, with loading and error states. Expected result: header is visible over the scene and tests/layout.test.tsx asserts Tailwind classes instead of legacy CSS strings. Why: the goal requires a polished header and honest round-status feedback.

## Acceptance criteria
- Given a loaded round, when the header renders, then logo, world name, round ID, status, countdown, sound toggle and settings are visible
- Given the round request is pending or failed, when the header renders, then a loading or an explained error message is shown instead of 'Round unavailable'
- Given the sound toggle or settings button is clicked, when the store is read, then soundEnabled or settingsOpen has flipped
- Given tests/layout.test.tsx runs, when it asserts layout, then it checks Tailwind classes and not legacy CSS strings


## Scope
- In scope: HeaderOverlay component
- In scope: App round loading/error state and header wiring
- In scope: GameLayout header slot
- In scope: tests/layout.test.tsx update
- Out of scope: Backend changes
- Out of scope: Phaser integration
- Out of scope: Settings dialog contents
- Out of scope: Audio playback
- Preserve: RoundBadge and Countdown public behavior and their tests
- Preserve: Existing uiStore API
- Preserve: ContributionSheet flow


## Technical constraints
- React + TypeScript, Tailwind, Lucide icons, Zustand
- Use real getCurrentRound API, no mock data in product code


## Definition of done
- All requirements delivered with passing unit tests


## Non-functional requirements
- Header must not cause horizontal overflow on mobile


## Clarifying questions
- None
