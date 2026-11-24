---
id: "01M84WBX7KY58B9P1FQZG74HWK"
kind: requirement
parent: 01M84WBX7KX6B33TTR8240BKV0
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# REQ · Dust, ambient lighting and scene transitions are content-driven

Context: sceneSchema has no effects field and nothing animates scene changes though the typed bus has transitionTo and the manifest holds effects/dust.svg. Desired behavior: add an optional effects array (types dust and ambientLight) to the scene schema, create effect entities on the effects layer, and run a fade-out, swap, fade-in transition. Expected: adding an effect or scene is a content edit. Why: atmosphere and scene changes without engine rewrites.

## Acceptance criteria
- Given a scene with effects [{type:'dust'}], when built, then particles are added at the effects depth
- Given {type:'ambientLight',color,alpha}, when built, then an overlay with that color and alpha is added
- Given a scene without effects, when parsed, then effects defaults to an empty list and parsing still succeeds
- Given a transition request, when run, then fade out is called, then the swap callback, then fade in, in that order


## Scope
- In scope: content/schema.ts effects field
- In scope: entities/effects.ts
- In scope: engine/transition.ts
- In scope: bedroom.yaml effects entries
- In scope: WorldScene transitionTo handling
- Out of scope: New art
- Preserve: Existing scene parsing results for scenes without effects


## Technical constraints
- Effects use the dust asset id from the manifest


## Definition of done
- Effects and transition wired in WorldScene


## Clarifying questions
- None
