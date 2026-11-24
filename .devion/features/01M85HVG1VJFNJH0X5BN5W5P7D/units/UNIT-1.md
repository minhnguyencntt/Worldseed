---
id: "01M85HVG1WPY90QJJ6TK3ASKFP"
kind: unit
parent: 01M85HVG1VYP9AXT9BCESB9D9Y
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Act: Add focusChange and menuClose to PhaserToReactEvents

Add focusChange and menuClose to the PhaserToReactEvents interface in events.ts so BootScene and App can use them.

## Acceptance criteria
- PhaserToReactEvents has focusChange: { id: string | null }.
- PhaserToReactEvents has menuClose: Record<string, never>.


## Scope
- In scope: events.ts interface
- Out of scope: BootScene
- Preserve: ReactToPhaserEvents


## Technical constraints
- Code path: `game/frontend/src/phaser/events.ts`


## Definition of done
- events.ts compiles with the two new members


## Clarifying questions
- None
