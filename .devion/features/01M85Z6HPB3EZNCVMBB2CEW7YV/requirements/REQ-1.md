---
id: "01M85Z6HPBV2QB6YBZDFSNZF4R"
kind: requirement
parent: 01M85Z6HPB3EZNCVMBB2CEW7YV
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# REQ · Overlay anchor is a pure function of native position, scale, canvas offset and DPR

Context: PhaserHost computes zoom via computeZoom(w,h,dpr) in frontend/src/phaser/config.ts and re-applies it on resize. There is no function that converts an object's native position to a DOM position. Desired: a pure function takes the object's position, interactionBounds, scale, the whole-number zoom, the canvas offset in CSS pixels and DPR, and returns the top-centre and bottom-centre screen points. Expected result: the overlay can be placed over the canvas at any zoom. Why: anchors must be exact and testable without Phaser.

## Acceptance criteria
- Given position (150,60), bounds 48x96, scale 1, zoom 2, offset (10,20), DPR 1, When anchorFor runs, Then top-centre is (10+(150+24)*2, 20+60*2) and bottom-centre is (10+(150+24)*2, 20+(60+96)*2)
- Given DPR 2 and a device-pixel zoom of 4, When anchorFor runs, Then the CSS-pixel result equals the DPR 1 zoom 2 result
- Given an object without interactionBounds, When anchorFor runs, Then it returns null


## Scope
- In scope: Pure anchor maths module
- In scope: Reading canvas offset and zoom from the Phaser host on resize
- Out of scope: Rendering the overlay
- Preserve: computeZoom behaviour


## Technical constraints
- Whole-number zoom only; nearest-neighbour
- Phaser stays on 3.90.x
- No position hardcoded; values come from ObjectSpec


## Definition of done
- anchorFor exported and used by the overlay
- PhaserHost reports canvas rect and zoom on resize and DPR change


## Non-functional requirements
- Pure, no DOM or Phaser access inside anchorFor


## Clarifying questions
- None
