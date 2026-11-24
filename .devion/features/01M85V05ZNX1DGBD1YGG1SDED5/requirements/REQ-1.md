---
id: "01M85V05ZPXAJ81BENDNY2JRCN"
kind: requirement
parent: 01M85V05ZNX1DGBD1YGG1SDED5
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# REQ · Boy sheet source holds 14 frames of 32x48 for idle, walk and interact

Context: no boy source exists in game/frontend/src/art. Desired behavior: boy.ts exports a pure BOY_SHEET_SOURCE with 14 frames built from draw.ts helpers with outline and ramp shading (blue hoodie). Expected result: frame count and size are testable. Why: SG-2.2 done-when.

## Acceptance criteria
- Given BOY_SHEET_SOURCE, when frames.length is read, then it equals 14
- Given each frame, when height and width are read, then they are 48 and 32
- Given every cell, when checked, then each value is an integer in 0..PALETTE.length-1


## Scope
- In scope: game/frontend/src/art/boy.ts sheet source
- Out of scope: portrait
- Out of scope: generator changes
- Preserve: draw.ts helpers


## Technical constraints
- Shared palette only, max 48 colours
- Native scale, no scaling
- Deterministic pure functions


## Definition of done
- boy.ts exports BOY_SHEET_SOURCE with 14 frames


## Clarifying questions
- None
