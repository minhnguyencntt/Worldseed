---
id: "01M84P4G701J0B8RRNWVMSWT2J"
kind: requirement
parent: 01M84P4G704X765C52M5D0C5GK
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# REQ · GameLayout exposes an optional header slot rendered as a compact overlay in the game area

Context: GameLayout in game/frontend/src/components/GameLayout.tsx takes only scene and story. Desired behavior: add an optional header prop rendered inside the relatively-positioned main element so HeaderOverlay (absolute, top) overlays the game. Expected result: header content shows in the game area, and layouts without a header are unchanged. Why: App needs a slot to host the header.

## Acceptance criteria
- Given a header prop, when GameLayout renders, then the header node is a descendant of the main element
- Given no header prop, when GameLayout renders, then it renders exactly as before with scene and story
- Given the header slot, when rendered, then the story aside does not contain the header


## Scope
- In scope: header prop on GameLayout
- Out of scope: Header styling changes
- Preserve: Existing grid, drawer toggle and aria-expanded behavior


## Technical constraints
- Tailwind classes only; main already has relative positioning


## Definition of done
- GameLayout renders header slot; layout tests pass


## Clarifying questions
- None
