---
id: "01M85WR55CHSVGHYATF92C73B0"
kind: unit
parent: 01M85WR55CV9APGA6Z00PCTYQS
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Act: Render moonlight shaft, lamp glow, door light and vignette in the Phaser effect context

Implement the new cases with Phaser 3.90 game objects at spec.depth and destroy handles removing all created objects.

## Acceptance criteria
- Each new case sets depth to spec.depth
- Vignette destroy removes all bands


## Scope
- In scope: effectContext.ts
- Out of scope: content
- Preserve: dust, ambientLight, transition cases


## Technical constraints
- Phaser 3.90.x APIs only
- Colour comes from spec
- Code path: `game/frontend/src/phaser/effectContext.ts`


## Dependencies
- REQ2
- ACT1


## Definition of done
- Switch exhaustive and typechecks


## Clarifying questions
- None
