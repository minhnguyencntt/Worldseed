---
id: "01M856R3XHV4CCEPKP3WVWKRFK"
kind: unit
parent: 01M856R3XH7SN8M84Z5SEAY00K
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Act: Add createPhaserRenderContext

Create game/frontend/src/phaser/renderContext.ts exporting createPhaserRenderContext(scene, resolveKey) that returns a RenderContext whose createSprite builds a Phaser image, label text and RenderHandle.

## Acceptance criteria
- createSprite places an image using the spec position, scale, depth and resolved key
- The handle implements highlight, label, visibility, hover, click and destroy


## Scope
- In scope: New renderContext.ts
- Out of scope: Tests
- Preserve: effectContext.ts


## Technical constraints
- Phaser 3.90 APIs
- New file: `game/frontend/src/phaser/renderContext.ts`


## Dependencies
- R1


## Definition of done
- createPhaserRenderContext compiles under tsc --noEmit


## Clarifying questions
- None
