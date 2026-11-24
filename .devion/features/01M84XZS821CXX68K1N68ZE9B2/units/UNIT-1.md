---
id: "01M84XZS83YWX75YVM3NWC5BAZ"
kind: unit
parent: 01M84XZS83EHNAVNSAG5DTG41E
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Act: Add playSceneTransition engine helper

Create game/src/engine/playSceneTransition.ts exporting playSceneTransition(ctx, scene) that finds the transition spec and calls ctx.playTransition(durationMs).

## Acceptance criteria
- Helper calls playTransition once with the durationMs of the first transition spec
- Helper does nothing when none exists


## Scope
- In scope: New engine file
- Out of scope: Tests
- Preserve: buildEffects.ts


## Technical constraints
- No Phaser import
- New file: `game/src/engine/playSceneTransition.ts`


## Definition of done
- File exists and type-checks


## Clarifying questions
- None
