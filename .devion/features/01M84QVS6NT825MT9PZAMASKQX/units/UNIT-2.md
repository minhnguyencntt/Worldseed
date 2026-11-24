---
id: "01M84QVS6PG8P4VD9ZEPA7JCFJ"
kind: unit
parent: 01M84QVS6PEN370GZRXGK3JXYX
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Act: Add dimensions to the three ui manifest entries

Edit the ui:icon-sound, ui:panel-frame and ui:cursor-pointer entries to add a dimensions object matching the SVG sizes.

## Acceptance criteria
- Given manifest.json, When parsed with parseManifest, Then ok is true
- Given the three ui entries, When read, Then dimensions are 16x16, 24x24 and 16x16


## Scope
- In scope: ui entries of manifest.json
- Out of scope: Other entries
- Preserve: ids, paths and types


## Technical constraints
- Must satisfy dimensionsSchema
- Code path: `game/public/assets/worlds/the-boys-room/manifest.json`


## Dependencies
- ACT1


## Definition of done
- Three entries have dimensions


## Clarifying questions
- None
