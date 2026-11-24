---
id: "01M85HGG8M1WGM30SXSRNTPF5W"
kind: requirement
parent: 01M85HGG8MWW9FGFSXB8039ERZ
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# REQ · React highlightObject events drive scene object focus

Context: ReactToPhaserEvents.highlightObject is declared but unused; SceneObject already has focus() and blur() that show highlight and label. Desired behavior: BootScene subscribes to reactToPhaser highlightObject in create(). Expected result: React can highlight a scene object. Why: completes the React to Phaser direction.

## Acceptance criteria
- Given a scene with objects, when highlightObject is emitted with an object id, then that object is focused and all others blurred
- Given a highlighted object, when highlightObject is emitted with null, then every object is blurred
- Given the scene shuts down, when highlightObject is emitted afterwards, then no object is touched


## Scope
- In scope: SceneObject spec id access
- In scope: BootScene highlightObject subscription and cleanup
- Out of scope: Emitting highlightObject from React components
- Preserve: Existing SHUTDOWN cleanup


## Technical constraints
- Reuse SceneObject.focus and blur


## Definition of done
- highlightObject focuses and clears objects; listener removed on shutdown


## Non-functional requirements
- No listener leak across scene restarts


## Clarifying questions
- None
