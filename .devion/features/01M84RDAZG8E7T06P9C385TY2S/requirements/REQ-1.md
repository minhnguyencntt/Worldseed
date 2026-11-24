---
id: "01M84RDAZGR8REASBKE89M9M5S"
kind: requirement
parent: 01M84RDAZG8E7T06P9C385TY2S
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# REQ · PhaserHost creates one pixel-art Phaser 3.90 game, handles resize and destroys it on unmount

Context: Phaser is absent from game/frontend. Desired behavior: add phaser ^3.90.0, a createGame factory wrapping new Phaser.Game(config), a config builder with pixelArt, roundPixels, FIT scaling with integer zoom, and a PhaserHost component guarded against StrictMode double-mount. A ResizeObserver on the container refreshes scaling for container size and devicePixelRatio. Expected result: one live game instance, destroyed on unmount. Why: prevents leaked canvases and blurry scaling.

## Acceptance criteria
- Given PhaserHost mounts in StrictMode, When effects run mount, cleanup, mount, Then at most one game is alive and destroy(true) was called on the first.
- Given PhaserHost unmounts, When cleanup runs, Then destroy(true) is called and the ref is null.
- Given buildGameConfig is called, When read, Then render.pixelArt and render.roundPixels are true and scale.mode is FIT.
- Given a container of 1000x600 at DPR 2, When computeZoom runs with a 640x360 logical size, Then it returns an integer of at least 1.
- Given the observed container resizes, When the observer fires, Then game.scale.refresh is called.


## Scope
- In scope: phaser dependency
- In scope: createGame factory
- In scope: buildGameConfig and computeZoom
- In scope: PhaserHost component
- Out of scope: scene content
- Out of scope: event bus
- Preserve: existing components and tests


## Technical constraints
- Phaser 3.90
- Zoom is an integer


## Dependencies
- INT


## Definition of done
- PhaserHost, config and factory exist and typecheck


## Non-functional requirements
- No leaked canvas elements


## Clarifying questions
- None
