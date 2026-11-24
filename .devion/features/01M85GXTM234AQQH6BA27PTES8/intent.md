---
id: "01M85GXTM234AQQH6BA27PTES8"
kind: intent
parent: null
status: draft
links: []
agent: null
source: llm
evidence: {"project_id":"944dfe9c-3760-4ab1-81a3-865a561626d8"}
---
# SG-9 Replace the flat scene image with the Phaser host in the game screen

Context: App.tsx composes the game screen with SceneView, which shows one flat <img> (ASSET_PATHS['scene:'+id]) with absolutely positioned HTML hotspot <button>s. PhaserHost, createGame and BootScene already exist, but nothing mounts PhaserHost in App. Desired behavior: the scene slot of GameLayout mounts PhaserHost with BootScene so the canvas draws the layered bedroom, furniture, objects, character and effects; the host is created once and destroyed on unmount. Expected result: no flat image or hotspot buttons in the playing view, and clicks on canvas objects still drive the ActionMenu. Why: the goal forbids building the game world from a flat image and HTML elements.

## Acceptance criteria
- Given the player clicked Begin, when App renders the playing view, then PhaserHost is mounted with BootScene in its scenes prop and no SceneView image or hotspot button is rendered.
- Given the playing view is mounted and App re-renders, when createGame calls are counted, then createGame was called exactly once and destroy(true) is called once on unmount.
- Given Phaser emits objectClick for an object id, when App is rendered, then the ActionMenu opens for that object.
- Given unit tests run, when Phaser and createGame are mocked, then no real Phaser game or canvas is created.


## Scope
- In scope: Mount PhaserHost with BootScene in App's scene slot
- In scope: Bridge the objectClick event from the typed bus to App selection state
- In scope: Unit tests with Phaser mocked
- Out of scope: Changing BootScene, buildScene or the layer engine
- Out of scope: Changing backend APIs
- Out of scope: Deleting the SceneView component or its tests
- Out of scope: Changing manifest or content files
- Preserve: ActionMenu, StoryPanel, HeaderOverlay and ContributionSheet behavior
- Preserve: PhaserHost mount-once lifecycle and resize/DPR handling
- Preserve: useGame persistence and the shared gameStore


## Technical constraints
- Phaser 3.90, React, TypeScript, Zustand as already configured in game/frontend
- Phaser owns rendering; React must not draw the scene with div or img elements
- Tests must mock createGame/phaser and never start a real Phaser game


## Definition of done
- App mounts PhaserHost with BootScene in place of SceneView
- objectClick from the bus selects the object in App
- New and updated unit tests pass with Phaser mocked


## Non-functional requirements
- No duplicate Phaser instances, including under React StrictMode


## Clarifying questions
- None
