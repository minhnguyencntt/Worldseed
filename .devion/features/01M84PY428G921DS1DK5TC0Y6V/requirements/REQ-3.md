---
id: "01M84PY428DYR01W94XXD9ZQXE"
kind: requirement
parent: 01M84PY428G921DS1DK5TC0Y6V
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# REQ · Scene view honors visibility conditions and persistent state

Context: getSceneView only supports openWhenFlag. Desired behavior: objects with visibleWhen conditions that fail are omitted; open derives from persistentState.flag (stored in GameState.flags, which persistence already saves) with openWhenFlag fallback; validateWorld checks the flags referenced. Expected result: the bookshelf stays open after the flag is set. Why: persistent object states.

## Acceptance criteria
- Given visibleWhen flag false, when getSceneView runs, then the object is absent
- Given persistentState flag true in state, when getSceneView runs, then open is true
- Given persistentState references an undeclared flag, when validateWorld runs, then 'unknown flag' error is returned


## Scope
- In scope: src/engine/scene.ts
- In scope: src/content/loader.ts validateWorld
- In scope: src/state/types.ts
- Out of scope: Phaser
- Preserve: openWhenFlag behavior
- Preserve: persistence.ts


## Technical constraints
- Reuse evaluateAll


## Dependencies
- R1


## Definition of done
- Behavior covered by unit tests


## Clarifying questions
- None
