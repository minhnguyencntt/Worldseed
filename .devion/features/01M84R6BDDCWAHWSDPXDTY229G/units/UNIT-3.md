---
id: "01M84R6BDENMSJZZFRCP5A89HP"
kind: unit
parent: 01M84R6BDEZJJTVK98H3EATG7J
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Act: Add boy walk and interact sheets and glow effect with manifest entries

Create walk and interact spritesheets and glow effect, register with frames and animations.

## Acceptance criteria
- Sheet widths equal frameWidth*frameCount
- Animations reference valid frames


## Scope
- In scope: SVGs
- In scope: manifest.json
- Out of scope: tests
- Out of scope: Phaser code
- Preserve: character:boy entry


## Technical constraints
- Frames 32x48
- New file: `game/public/assets/worlds/the-boys-room/characters/boy-walk.svg`
- New file: `game/public/assets/worlds/the-boys-room/characters/boy-interact.svg`
- New file: `game/public/assets/worlds/the-boys-room/effects/glow.svg`
- Code path: `game/public/assets/worlds/the-boys-room/manifest.json`


## Definition of done
- Files exist and entries added


## Clarifying questions
- None
