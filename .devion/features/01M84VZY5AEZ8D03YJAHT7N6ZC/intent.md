---
id: "01M84VZY5AEZ8D03YJAHT7N6ZC"
kind: intent
parent: null
status: draft
links: []
agent: null
source: llm
evidence: {"project_id":"944dfe9c-3760-4ab1-81a3-865a561626d8"}
---
# SG-4.4 · Apply device pixel ratio at runtime

Context: game/frontend/src/phaser/config.ts exports computeZoom(w,h,dpr) but nothing calls it. buildGameConfig sets no zoom, and PhaserHost's ResizeObserver only calls scale.refresh(). Desired behavior: the zoom computed from window.devicePixelRatio and the container size is passed into the game config at creation, and recomputed in the ResizeObserver callback and when the ratio changes. Expected result: Phaser-mocked unit tests show the zoom is passed in and refreshed on resize. Why: the pixel-art scene stays crisp on high-DPI and resized displays.

## Acceptance criteria
- Given a container of 1280x720 and dpr 2, when PhaserHost mounts, then createGame receives zoom equal to computeZoom(1280,720,2)
- Given a mounted PhaserHost, when the ResizeObserver callback fires with a new size or dpr, then scale.setZoom is called with the recomputed zoom and scale.refresh is called
- Given a devicePixelRatio change, when the media query change event fires, then the zoom is recomputed and applied


## Scope
- In scope: buildGameConfig and createGame zoom parameter
- In scope: PhaserHost zoom computation and refresh
- Out of scope: Changing GAME_WIDTH/GAME_HEIGHT
- Out of scope: Changing the computeZoom formula
- Out of scope: Scene or asset changes
- Preserve: Single game instance and destroy(true) cleanup on unmount
- Preserve: pixelArt, roundPixels and FIT scale settings


## Technical constraints
- Phaser 3.90 APIs only (ScaleManager.setZoom, scale.refresh)
- Unit tests mock createGame and Phaser, no real browser


## Definition of done
- Both requirements verified by passing unit tests


## Clarifying questions
- None
