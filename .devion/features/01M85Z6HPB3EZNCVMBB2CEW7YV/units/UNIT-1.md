---
id: "01M85Z6HPB4DCX2GYYCPPNWK9C"
kind: unit
parent: 01M85Z6HPBV2QB6YBZDFSNZF4R
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Act: Add anchorFor and report canvas rect and zoom from PhaserHost

Add frontend/src/lib/anchor.ts exporting anchorFor and have PhaserHost report its canvas rect and zoom through an optional onLayout callback on mount, resize and DPR change.

## Acceptance criteria
- anchorFor returns top-centre and bottom-centre CSS-pixel points from position, bounds, scale, zoom, offset and DPR
- PhaserHost calls onLayout with {left, top, zoom, dpr} after every applyZoom


## Scope
- In scope: frontend/src/lib/anchor.ts
- In scope: PhaserHost onLayout prop
- Out of scope: Overlay rendering
- Preserve: computeZoom, mount-once game creation


## Technical constraints
- Whole-number zoom only
- Phaser stays on 3.90.x
- New file: `game/frontend/src/lib/anchor.ts`
- Code path: `game/frontend/src/components/PhaserHost.tsx`


## Dependencies
- REQ1


## Definition of done
- anchorFor exported
- onLayout invoked on resize


## Clarifying questions
- None
