---
id: "01M84RDAZG8E7T06P9C385TY2S"
kind: intent
parent: null
status: draft
links: []
agent: null
source: llm
evidence: {"project_id":"944dfe9c-3760-4ab1-81a3-865a561626d8"}
---
# SG-4 · Integrate Phaser 3.90 with a lifecycle-safe React host and typed events

Context: game/frontend is a React 18 + Vite + zustand app. SceneView.tsx renders the bedroom as an <img> plus absolutely positioned hotspot buttons. useGame.ts keeps GameState in React useState, and uiStore.ts holds only UI flags. Phaser is not installed and no src/phaser folder exists. Desired behavior: install Phaser 3.90 and add a PhaserHost React component that owns exactly one Phaser.Game, with pixel-art config, resize and device-pixel-ratio handling. Add a typed event bus for Phaser to React and React to Phaser messages. Move shared GameState into a Zustand store that Phaser reads without duplicating it. Expected result: unit tests with Phaser mocked prove single-instance creation, cleanup on unmount, resize handling and typed event delivery. Why: it is the base for the layered Phaser scene work in later sub-goals.

## Acceptance criteria
- Given package.json, When dependencies are read, Then phaser resolves to a 3.90.x version.
- Given PhaserHost mounts under React.StrictMode, When effects run twice, Then the Phaser game factory returns exactly one live instance and destroys the first before the second is created.
- Given PhaserHost unmounts, When cleanup runs, Then game.destroy(true) is called once and no instance remains.
- Given the game config, When it is built, Then pixelArt and roundPixels are true and scale mode is FIT with integer-friendly zoom.
- Given a typed event is emitted on the bus, When a listener is subscribed, Then the listener receives the exact typed payload and no payload after unsubscribe.
- Given GameState changes in the Zustand store, When a Phaser scene reads it, Then it gets the store value and keeps no copy.


## Scope
- In scope: phaser dependency
- In scope: PhaserHost component
- In scope: pixel-art game config and scale helper
- In scope: typed event bus
- In scope: Zustand game store read by a Phaser scene
- In scope: unit tests with Phaser mocked
- Out of scope: layered bedroom rendering
- Out of scope: sprites and animations
- Out of scope: Go backend changes
- Out of scope: replacing SceneView in App
- Preserve: useGame return shape: state, scene, view, act, choose
- Preserve: existing tests under game/frontend/tests
- Preserve: localStorage persistence behavior


## Technical constraints
- Phaser 3.90
- TypeScript
- Zustand for shared state
- Tests under game/frontend/tests, run with vitest run
- Unit tests must mock the phaser module


## Definition of done
- All requirements delivered with Act and Verify units
- Unit tests pass and tsc --noEmit passes


## Non-functional requirements
- No duplicate Phaser instances or listener leaks


## Clarifying questions
- None
