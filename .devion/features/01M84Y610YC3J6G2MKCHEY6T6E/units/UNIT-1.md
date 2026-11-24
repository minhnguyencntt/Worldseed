---
id: "01M84Y610YFG8ZDTPPSPCMSS1W"
kind: unit
parent: 01M84Y610Y2QQFCNE90MN5HN1A
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Act: Add playSceneTransition engine helper

Add game/src/engine/playSceneTransition.ts exporting playSceneTransition(ctx, scene) that calls ctx.playTransition with the durationMs of the first transition effect.

## Acceptance criteria
- playSceneTransition calls ctx.playTransition(durationMs) for a scene with a transition spec.
- playSceneTransition makes no call when no transition spec exists.


## Scope
- In scope: New helper file
- Out of scope: BootScene changes
- Preserve: buildEffects.ts unchanged


## Technical constraints
- No Phaser import
- New file: `game/src/engine/playSceneTransition.ts`


## Definition of done
- Helper compiles under tsc


## Clarifying questions
- None
