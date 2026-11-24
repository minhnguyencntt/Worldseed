---
id: "01M84PY429CGDKJG567KYFF5BA"
kind: unit
parent: 01M84PY428DYR01W94XXD9ZQXE
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Act: Apply visibleWhen and persistentState in scene view and validator

Filter by visibleWhen, derive open from persistentState, validate referenced flags.

## Acceptance criteria
- Hidden objects omitted
- open follows persistent flag


## Scope
- In scope: scene.ts
- In scope: loader.ts validateWorld
- Out of scope: tests
- Preserve: openWhenFlag fallback


## Technical constraints
- Reuse evaluateAll
- Code path: `game/src/engine/scene.ts`
- Code path: `game/src/content/loader.ts`


## Definition of done
- Implemented


## Clarifying questions
- None
