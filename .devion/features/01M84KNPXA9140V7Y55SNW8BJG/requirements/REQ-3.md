---
id: "01M84KNPXB7SRR2TP2MMDGFG4S"
kind: requirement
parent: 01M84KNPXA9140V7Y55SNW8BJG
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# REQ · Shell renders a full-viewport 80/20 layout with a mobile bottom drawer

Context: GameLayout uses local state and min-height 100vh CSS grid, which can scroll the page. Desired behavior: root is h-screen w-screen overflow-hidden; desktop (md and up) grid columns 4fr/1fr with the story column scrolling independently; below md the story panel is a fixed bottom drawer driven by useUiStore.drawerOpen; the Story toggle and scene stay mounted. Why: no page scroll and reachable controls on mobile.

## Acceptance criteria
- Given GameLayout rendered, when inspected, then the root has overflow-hidden, h-screen and w-screen and the grid has md:grid-cols-[4fr_1fr]
- Given the Story button clicked, when the store is read, then drawerOpen toggles and aria-expanded matches while the scene stays mounted
- Given the story aside, when inspected, then it has overflow-y-auto and exactly one .story-panel exists
- Given drawerOpen true, when rendered, then only the aside has drawer-open


## Scope
- In scope: GameLayout.tsx, styles.css layout rules
- Out of scope: header
- Out of scope: Phaser
- Preserve: Story button name
- Preserve: story-content class
- Preserve: existing aria-expanded behavior


## Technical constraints
- Tailwind classes; state from useUiStore


## Dependencies
- REQ1
- REQ2


## Definition of done
- Layout classes in place


## Non-functional requirements
- No horizontal overflow


## Clarifying questions
- None
