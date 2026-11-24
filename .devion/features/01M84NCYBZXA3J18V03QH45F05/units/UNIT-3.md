---
id: "01M84NCYC0K9K6AXES97M0T7VM"
kind: unit
parent: 01M84NCYC0DGSB9K2J79XFR2ME
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Act: Add header slot to GameLayout

Add header?: ReactNode prop, rendered first inside main.

## Acceptance criteria
- Given a header prop, when GameLayout renders, then the header node is a child of main rendered before the scene
- Given no header prop, when GameLayout renders, then main still renders the scene unchanged


## Scope
- In scope: GameLayout.tsx
- Preserve: Drawer behavior


## Technical constraints
- Code path: `game/frontend/src/components/GameLayout.tsx`


## Definition of done
- tsc passes


## Clarifying questions
- None
