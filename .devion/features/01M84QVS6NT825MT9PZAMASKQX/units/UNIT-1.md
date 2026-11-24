---
id: "01M84QVS6PD58NADCVBEEHF484"
kind: unit
parent: 01M84QVS6NJ8XSZ8V72MHBXRTA
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Act: Add the three ui SVG files under game/public/assets/ui

Create the three files with the same content as game/frontend/public/assets/ui so the folders are tracked by git.

## Acceptance criteria
- Given the repo, When the ui folders are listed, Then each holds one non-empty SVG
- Given each file, When read, Then it matches the file of the same name under game/frontend/public/assets/ui


## Scope
- In scope: Three new SVG files
- Out of scope: Manifest edits
- Preserve: frontend ui assets


## Technical constraints
- Keep shape-rendering="crispEdges"
- New file: `game/public/assets/ui/icons/sound.svg`
- New file: `game/public/assets/ui/frames/panel-frame.svg`
- New file: `game/public/assets/ui/cursors/pointer.svg`


## Definition of done
- Three SVGs exist under game/public/assets/ui


## Clarifying questions
- None
