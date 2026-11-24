---
id: "01M84KNPXB380A2NXJ90AT9A76"
kind: unit
parent: 01M84KNPXB7SRR2TP2MMDGFG4S
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Act: Rebuild GameLayout with Tailwind and the UI store

Rewrite GameLayout to use useUiStore and Tailwind utility classes; remove the old grid and story-panel layout rules from styles.css.

## Acceptance criteria
- GameLayout reads drawerOpen from the store
- Layout classes match the requirement


## Scope
- In scope: GameLayout.tsx
- In scope: styles.css
- Out of scope: tests
- Preserve: contribution-sheet CSS


## Technical constraints
- Keep class names story-panel and drawer-open
- Code path: `game/frontend/src/components/GameLayout.tsx`
- Code path: `game/frontend/src/styles.css`


## Definition of done
- Compiles; no local useState in GameLayout


## Clarifying questions
- None
