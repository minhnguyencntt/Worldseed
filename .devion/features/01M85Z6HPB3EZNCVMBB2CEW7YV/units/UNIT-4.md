---
id: "01M85Z6HPC8DBJST7QM8S50KRR"
kind: unit
parent: 01M85Z6HPBQRGS07SJDFEQ8S58
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Act: Delete ActionMenu and leftover hotspot-path styles

After ObjectOverlay replaced it, delete the unanchored ActionMenu component and remaining references.

## Acceptance criteria
- ActionMenu.tsx is gone
- No import of ActionMenu remains


## Scope
- In scope: Delete ActionMenu.tsx
- In scope: CSS cleanup
- Out of scope: getSceneView helper
- Preserve: useGame.view


## Technical constraints
- Do not read .devion/worktrees
- Code path: `game/frontend/src/components/ActionMenu.tsx`
- Code path: `game/frontend/src/styles.css`


## Dependencies
- ACT2


## Definition of done
- tsc passes without ActionMenu


## Clarifying questions
- None
