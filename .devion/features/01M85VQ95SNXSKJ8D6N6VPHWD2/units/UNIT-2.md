---
id: "01M85VQ95TM2N195SB17ZQF7S8"
kind: unit
parent: 01M85VQ95S84F32VZMMPMKN2PZ
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Act: Re-lay out bedroom.yaml on PNG ids and prune SVG entries from the manifest

Edit the scene content to the new ids and 480x270 layout, and remove every manifest entry whose path ends .svg.

## Acceptance criteria
- bedroom.yaml references only PNG ids
- manifest.json has no .svg path


## Scope
- In scope: bedroom.yaml
- In scope: manifest.json
- Out of scope: Deleting files
- Preserve: Object ids, actions, events


## Technical constraints
- 480x270 coordinates
- Data-driven content
- Code path: `game/src/content/worlds/the-boys-room/scenes/bedroom.yaml`
- Code path: `game/public/assets/worlds/the-boys-room/manifest.json`


## Dependencies
- R2
- A1


## Definition of done
- Positions inside 480x270
- Content loads through runtime/content.ts


## Clarifying questions
- None
