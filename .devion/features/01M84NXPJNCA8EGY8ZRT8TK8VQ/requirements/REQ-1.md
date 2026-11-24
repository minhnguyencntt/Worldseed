---
id: "01M84NXPJN2E1ESKQQCM1YSECF"
kind: requirement
parent: 01M84NXPJNCA8EGY8ZRT8TK8VQ
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# REQ · GameLayout exposes an optional header slot

Context: GameLayout takes only scene and story. Desired behavior: an optional header prop is rendered inside the relative main element before the scene so HeaderOverlay's absolute positioning anchors to the game area. Expected result: header content appears in main; omitting it changes nothing. Why: App needs to place the header without custom markup.

## Acceptance criteria
- Given a header node is passed, when GameLayout renders, then the node is inside the main element together with the scene.
- Given no header prop, when GameLayout renders, then the layout renders as before with the scene and Story toggle.


## Scope
- In scope: GameLayout header prop
- Out of scope: Layout class changes
- Preserve: 80/20 grid, drawer toggle and overflow classes


## Technical constraints
- Prop must be optional


## Definition of done
- Header slot renders in main


## Clarifying questions
- None
