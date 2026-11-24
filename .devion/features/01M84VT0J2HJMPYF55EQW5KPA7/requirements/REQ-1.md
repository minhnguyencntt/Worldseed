---
id: "01M84VT0J202TT42DB7C51XRBE"
kind: requirement
parent: 01M84VT0J2HJMPYF55EQW5KPA7
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# REQ · Game config declares pixel-art, round-pixel and FIT scaling keys valid in Phaser 3.90

Context: config.ts has render and scale blocks but no autoRound and the render block is inline. Desired: render settings in an exported constant and scale gains autoRound true so canvas CSS size stays on whole pixels. Expected: valid Phaser 3.90 GameConfig.

## Acceptance criteria
- Given buildGameConfig, When called with a div, Then render equals {pixelArt:true, roundPixels:true, antialias:false}
- Given buildGameConfig, When called, Then scale includes mode FIT, autoCenter CENTER_BOTH and autoRound true


## Scope
- In scope: config.ts render and scale blocks
- Out of scope: Zoom computation
- Preserve: Existing config shape and scenes passthrough


## Technical constraints
- Keys must exist in Phaser 3.90 GameConfig typings


## Definition of done
- Config contains all keys


## Clarifying questions
- None
