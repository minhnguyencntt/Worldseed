---
id: "01M858C7X9GYERXC4HG88Q5PDC"
kind: unit
parent: 01M858C7X9KQWTCPQ1PFTR5TEW
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Act: Confirm effectContext dust passes the resolved key to particles

Read the dust branch and confirm resolveKey(spec.asset) is the third argument of scene.add.particles; fix only if not.

## Acceptance criteria
- Third particles argument is resolveKey(spec.asset)
- setDepth(spec.depth) is applied


## Scope
- In scope: effectContext.ts dust case
- Out of scope: ambientLight
- Preserve: emitZone options


## Technical constraints
- Code path: `game/frontend/src/phaser/effectContext.ts`


## Definition of done
- Behavior confirmed


## Clarifying questions
- None
