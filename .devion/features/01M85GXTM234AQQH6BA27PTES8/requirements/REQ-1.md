---
id: "01M85GXTM3SFQ205GX4ERCQ18B"
kind: requirement
parent: 01M85GXTM234AQQH6BA27PTES8
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# REQ · App game screen mounts PhaserHost with BootScene instead of the flat image

Context: game/frontend/src/App.tsx renders <SceneView .../> (flat image plus hotspot buttons) in the GameLayout scene prop. Desired behavior: render <PhaserHost scenes={[BootScene]} /> in a full-size container in that slot, keeping ActionMenu, the Suggest button and ContributionSheet. Expected result: one canvas host is created when the playing view mounts and destroyed on unmount. Why: Phaser must own scene rendering.

## Acceptance criteria
- Given Begin is clicked, when App renders, then the element with data-testid phaser-host exists and no img named after the scene title exists.
- Given Begin is clicked, when App renders, then createGame is called once with a scenes array containing BootScene.
- Given the playing view is unmounted, when cleanup runs, then the mocked game's destroy is called once with true.


## Scope
- In scope: App.tsx scene slot composition
- Out of scope: PhaserHost internals
- Out of scope: BootScene internals
- Preserve: ActionMenu, Suggest What Happens Next button and ContributionSheet rendering


## Technical constraints
- PhaserHost is mounted only after Begin so the intro screen creates no game


## Definition of done
- SceneView is no longer rendered by App
- PhaserHost receives BootScene


## Clarifying questions
- None
