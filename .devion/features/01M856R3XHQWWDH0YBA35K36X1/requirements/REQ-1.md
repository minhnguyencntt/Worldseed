---
id: "01M856R3XH7SN8M84Z5SEAY00K"
kind: requirement
parent: 01M856R3XHQWWDH0YBA35K36X1
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# REQ · A Phaser-backed RenderContext draws sprites from engine specs

Context: RenderContext and RenderHandle exist in game/src/engine/renderContext.ts, but only EffectRenderContext has a Phaser implementation (effectContext.ts). Desired behavior: a Phaser implementation creates an image per RenderSpriteSpec at its position, scale and depth, with hover highlight, a name label, visibility, hit bounds and click. Expected result: SceneObject can render in Phaser. Why: it is the only missing piece between buildScene and the canvas.

## Acceptance criteria
- Given a RenderSpriteSpec, when createSprite runs, then an image is added with key resolved through resolveKey, the spec x, y, scale and depth
- Given spec.bounds, when createSprite runs, then the image is made interactive with a hit rectangle equal to the bounds
- Given a handle, when setHighlighted(true) and setLabelVisible(true) are called, then a tint is applied and the label text is shown, and both are cleared on false
- Given a handle, when destroy runs, then the image and the label are destroyed


## Scope
- In scope: New frontend/src/phaser/renderContext.ts
- Out of scope: Effects context changes
- Out of scope: Character sprites
- Preserve: effectContext.ts behavior
- Preserve: RenderContext interface


## Technical constraints
- Phaser 3.90 APIs only
- Resolve texture keys through an injected resolveKey function so the fallback texture applies


## Dependencies
- INT


## Definition of done
- createPhaserRenderContext is exported and implements RenderContext


## Clarifying questions
- None
