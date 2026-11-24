---
id: "01M8583P0BAH3PSB6YYCNR4RWC"
kind: unit
parent: 01M8583P0BWG59KN6J2NRAAF7M
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Act: Type the manifest asset callback in BootScene.preload

Annotate the find callback parameter with the manifest asset element type.

## Acceptance criteria
- Given the annotated callback, When tsc runs, Then no TS7006 at BootScene.ts L42
- Given preload, When run, Then the same images load


## Scope
- In scope: BootScene.ts
- Out of scope: manifest schema
- Preserve: preload behavior


## Technical constraints
- Code path: `game/frontend/src/phaser/BootScene.ts`


## Definition of done
- Callback typed


## Clarifying questions
- None
