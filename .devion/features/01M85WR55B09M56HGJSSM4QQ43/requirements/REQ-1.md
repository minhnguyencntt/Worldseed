---
id: "01M85WR55CYWB99P9V3J3VJ8MR"
kind: requirement
parent: 01M85WR55B09M56HGJSSM4QQ43
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# REQ · Scene content declares moonlight shaft, lamp glow, door light and vignette with palette colours

Context: effectSchema in game/src/content/schema.ts is a discriminated union of dust, ambientLight and transition. Desired: add moonlightShaft, lampGlow, doorLight and vignette variants and author them in bedroom.yaml with palette hex colours. Expected result: the bedroom validates and lists six non-transition effects. Why: effects must be data-driven.

## Acceptance criteria
- Given a scene with a moonlightShaft, lampGlow, doorLight and vignette effect, when validated, then it passes
- Given a lampGlow with a negative radius, when validated, then validation fails with a path starting effects.0
- Given the bedroom scene, when loaded, then its effect types include moonlightShaft, lampGlow, doorLight and vignette and every colour is in PALETTE


## Scope
- In scope: game/src/content/schema.ts
- In scope: bedroom.yaml effects
- Out of scope: rendering
- Out of scope: new rooms
- Preserve: dust, ambientLight and transition schema variants


## Technical constraints
- One shared palette of at most 48 colours
- Scene content stays data-driven


## Dependencies
- INT


## Definition of done
- Schema and content merged


## Clarifying questions
- None
