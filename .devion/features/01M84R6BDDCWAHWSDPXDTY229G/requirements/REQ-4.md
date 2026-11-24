---
id: "01M84R6BDETVCK5ENHTAAGATXA"
kind: requirement
parent: 01M84R6BDDCWAHWSDPXDTY229G
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# REQ · Schema rejects spritesheets whose frames or animations disagree with the sheet

Context: assetSchema in game/src/assets/manifest/schema.ts only requires frames and dimensions for spritesheets. Desired behavior: superRefine also reports an issue when frameWidth*frameCount exceeds the width, frameHeight exceeds the height, or an animation frame index is >= frameCount. Expected result: invalid sheets fail parseManifest with path-named errors. Why: catch broken sheets early.

## Acceptance criteria
- Given a spritesheet with frameCount 3 and width 64 and frameWidth 32, when parsed, then an issue at frames.frameCount is returned
- Given an animation referencing frame index 5 with frameCount 2, when parsed, then an issue at animations.<name>.frames is returned
- Given the committed manifest, when parsed, then it is ok


## Scope
- In scope: schema superRefine checks
- Out of scope: image decoding
- Preserve: existing error messages for missing frames/dimensions


## Technical constraints
- Must not throw; use ctx.addIssue


## Definition of done
- Schema checks implemented


## Clarifying questions
- None
