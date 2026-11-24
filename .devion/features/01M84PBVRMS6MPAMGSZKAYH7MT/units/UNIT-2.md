---
id: "01M84PBVRNJ5FWD9TM6A0WRHDG"
kind: unit
parent: 01M84PBVRNWN22DRPEVFTCZB2Z
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Act: Author the-boys-room manifest, scene and asset folders

Create content data separate from the engine and the asset directory tree.

## Acceptance criteria
- manifest.json and scene.json exist
- asset folders exist


## Scope
- In scope: content json
- In scope: gitkeep files
- Out of scope: artwork
- Preserve: game/content YAML


## Technical constraints
- New file: `game/src/content/worlds/the-boys-room/manifest.json`
- New file: `game/src/content/worlds/the-boys-room/scene.json`
- New file: `game/public/assets/worlds/the-boys-room/backgrounds/.gitkeep`
- New file: `game/public/assets/worlds/the-boys-room/furniture/.gitkeep`
- New file: `game/public/assets/worlds/the-boys-room/objects/.gitkeep`
- New file: `game/public/assets/worlds/the-boys-room/characters/.gitkeep`
- New file: `game/public/assets/worlds/the-boys-room/effects/.gitkeep`
- New file: `game/public/assets/worlds/the-boys-room/audio/.gitkeep`
- New file: `game/public/assets/ui/icons/.gitkeep`
- New file: `game/public/assets/ui/frames/.gitkeep`
- New file: `game/public/assets/ui/cursors/.gitkeep`


## Definition of done
- Content validates against R1 schemas


## Clarifying questions
- None
