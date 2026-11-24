---
id: "01M84NXPJNZBSJDAZ35H152VEC"
kind: unit
parent: 01M84NXPJN2E1ESKQQCM1YSECF
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Act: Add header slot prop to GameLayout

Edit GameLayout to accept and render an optional header ReactNode inside main before the scene.

## Acceptance criteria
- GameLayout renders the header node inside main when provided.
- GameLayout without header renders unchanged.


## Scope
- In scope: GameLayout.tsx
- Out of scope: Tests
- Preserve: Existing classes


## Technical constraints
- Code path: `game/frontend/src/components/GameLayout.tsx`


## Definition of done
- header prop typed and rendered


## Clarifying questions
- None
