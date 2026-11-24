---
id: "01M84N2BMBGDYSDTD3QY1R2RBQ"
kind: unit
parent: 01M84N2BMBM9AXXZ1A4EZ8TSGY
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Act: Drive the mobile drawer from useUiStore and delete legacy layout CSS

Replace the local useState drawer in GameLayout with useUiStore selectors, style the aside as a fixed bottom drawer below md with data-state, hide the toggle at md and up, pad the scene for the handle, and delete the .game-layout, .story-panel and media-query rules from styles.css.

## Acceptance criteria
- GameLayout reads drawerOpen and toggleDrawer from useUiStore and has no useState.
- The aside carries data-state open/closed and translate classes; the scene main has pb-12 md:pb-0.
- styles.css no longer has the legacy rules; .contribution-sheet rules remain.


## Scope
- In scope: GameLayout.tsx
- In scope: styles.css
- Out of scope: uiStore.ts
- Out of scope: tests
- Preserve: Story button name and aria-expanded
- Preserve: contribution-sheet CSS


## Technical constraints
- Keep Button, ChevronUp, motion.aside
- Code path: `game/frontend/src/components/GameLayout.tsx`
- Code path: `game/frontend/src/styles.css`


## Dependencies
- ACT-1


## Definition of done
- Store-driven drawer; legacy CSS gone


## Clarifying questions
- None
