---
id: "01M84VT0J2HJMPYF55EQW5KPA7"
kind: intent
parent: null
status: draft
links: []
agent: null
source: llm
evidence: {"project_id":"944dfe9c-3760-4ab1-81a3-865a561626d8"}
---
# SG-4.3 Confirm Phaser 3.90 game config pixel-art, DPR and fit scaling

Context: game/frontend/src/phaser/config.ts builds the Phaser config (pixelArt, roundPixels, antialias false, Scale.FIT, CENTER_BOTH) and exports computeZoom(w,h,dpr), which nothing consumes yet. Desired behavior: config uses only 3.90-valid keys, DPR handling is safe, and unit tests run with phaser mocked. Why: crisp pixel art at any device pixel ratio.

## Acceptance criteria
- Given buildGameConfig is called, When inspected, Then render.pixelArt, render.roundPixels are true and antialias is false
- Given buildGameConfig is called, When inspected, Then scale.mode is Scale.FIT with autoCenter CENTER_BOTH and autoRound true
- Given computeZoom receives a zero, negative or NaN dpr, When called, Then it returns an integer >= 1
- Given phaser is mocked, When the config unit tests run, Then they pass


## Scope
- In scope: game/frontend/src/phaser/config.ts
- In scope: game/frontend/tests/phaserConfig.test.ts
- Out of scope: Scenes, assets, React host changes
- Preserve: GAME_WIDTH/GAME_HEIGHT 640x360
- Preserve: createGame seam
- Preserve: phaser ~3.90.0 pin


## Technical constraints
- Phaser 3.90 only; no Phaser 4 keys


## Definition of done
- All requirements have passing unit tests


## Clarifying questions
- None
