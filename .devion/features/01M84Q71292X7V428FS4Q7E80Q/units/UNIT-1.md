---
id: "01M84Q712AETHC8SR084FY5R9J"
kind: unit
parent: 01M84Q7129MC8MC7ZVV11YBNPW
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Act: Create asset folders with temporary pixel-art files

Add SVG pixel-art assets for background, furniture, objects, a 2-frame boy spritesheet, a dust effect, ui icon, frame and cursor, and a tiny WAV for audio. Mark them temporary in a README.

## Acceptance criteria
- Given the repo, when the folders are listed, then all 9 folders exist
- Given each folder, when read, then it has a non-empty file


## Scope
- In scope: game/public/assets files
- Out of scope: code changes
- Preserve: existing frontend assets


## Technical constraints
- SVG uses shape-rendering="crispEdges"
- Spritesheet boy-sheet.svg is 64x48 with two 32x48 frames
- New file: `game/public/assets/worlds/the-boys-room/backgrounds/bedroom-room.svg`
- New file: `game/public/assets/worlds/the-boys-room/furniture/bed.svg`
- New file: `game/public/assets/worlds/the-boys-room/furniture/bookshelf.svg`
- New file: `game/public/assets/worlds/the-boys-room/furniture/desk.svg`
- New file: `game/public/assets/worlds/the-boys-room/objects/old-computer.svg`
- New file: `game/public/assets/worlds/the-boys-room/objects/door.svg`
- New file: `game/public/assets/worlds/the-boys-room/objects/window.svg`
- New file: `game/public/assets/worlds/the-boys-room/characters/boy-sheet.svg`
- New file: `game/public/assets/worlds/the-boys-room/effects/dust.svg`
- New file: `game/public/assets/worlds/the-boys-room/audio/ambient-room.wav`
- New file: `game/public/assets/ui/icons/sound.svg`
- New file: `game/public/assets/ui/frames/panel-frame.svg`
- New file: `game/public/assets/ui/cursors/pointer.svg`
- New file: `game/public/assets/README.md`


## Definition of done
- All files created and non-empty


## Clarifying questions
- None
