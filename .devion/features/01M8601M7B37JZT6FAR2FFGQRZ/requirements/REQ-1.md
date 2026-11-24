---
id: "01M8601M7BKRMAF22Y0N8NKBCB"
kind: requirement
parent: 01M8601M7B37JZT6FAR2FFGQRZ
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# REQ · GameLayout gives about 3/4 width to the game area and drops to a store-driven bottom drawer when narrow

Context: GameLayout.tsx L19 uses md:grid-cols-[4fr_1fr]. Desired: 3fr/1fr so the panel gets a quarter, holding from 1280x720 up; below md the aside is a fixed bottom drawer driven by useUiStore.drawerOpen (already implemented). Expected: classes updated. Why: matches the reference.

## Acceptance criteria
- Given the root grid, when rendered, then it has class md:grid-cols-[3fr_1fr] and not md:grid-cols-[4fr_1fr]
- Given the aside, when rendered, then it keeps max-md fixed bottom drawer classes and data-state from drawerOpen


## Scope
- In scope: GameLayout grid class
- Out of scope: drawer redesign
- Preserve: Story toggle button
- Preserve: uiStore drawer state


## Technical constraints
- Tailwind and Zustand stay


## Dependencies
- INT


## Definition of done
- Grid class changed; narrow drawer unchanged


## Non-functional requirements
- Holds from 1280x720 up


## Clarifying questions
- None
