---
id: "01M84N2BMBCPJVEV5E1AK2PZY7"
kind: unit
parent: 01M84N2BMB0A9J37ENYEPPEGFS
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Act: Apply Tailwind desktop layout classes and overflow rules

Replace the legacy class names on GameLayout's root, main and aside with Tailwind utilities for the 80/20 split and independent story scrolling, and add the overflow rules for html, body and #root to styles.css.

## Acceptance criteria
- GameLayout root has grid h-screen w-full overflow-hidden grid-cols-1 md:grid-cols-[4fr_1fr].
- The aside has overflow-y-auto and md:h-screen; the main has min-w-0.
- styles.css sets html, body and #root to height 100% and overflow hidden.


## Scope
- In scope: GameLayout.tsx
- In scope: styles.css
- Out of scope: tests
- Preserve: props and Story button


## Technical constraints
- Tailwind utilities
- Code path: `game/frontend/src/components/GameLayout.tsx`
- Code path: `game/frontend/src/styles.css`


## Dependencies
- REQ-1


## Definition of done
- Classes applied; build type-checks


## Clarifying questions
- None
