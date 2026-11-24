---
id: "01M84VZY5BGT9SR2BFZTJVQJPE"
kind: unit
parent: 01M84VZY5BC4WNJ43ECVGN26ND
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Act: Compute and refresh zoom in PhaserHost

PhaserHost computes the zoom from the container size and window.devicePixelRatio, passes it to createGame, and re-applies it via scale.setZoom plus scale.refresh on resize and ratio change.

## Acceptance criteria
- createGame receives computed zoom
- Resize and dpr change call setZoom then refresh


## Scope
- In scope: PhaserHost.tsx
- Out of scope: config.ts
- Preserve: Cleanup and single instance


## Technical constraints
- Phaser 3.90 ScaleManager.setZoom
- Code path: `game/frontend/src/components/PhaserHost.tsx`


## Dependencies
- ACT1


## Definition of done
- Host wired and type-check clean


## Clarifying questions
- None
