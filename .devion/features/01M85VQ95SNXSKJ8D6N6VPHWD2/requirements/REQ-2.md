---
id: "01M85VQ95S84F32VZMMPMKN2PZ"
kind: requirement
parent: 01M85VQ95SNXSKJ8D6N6VPHWD2
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# REQ · World content and manifest reference only PNG ids at 480x270

Context: bedroom.yaml positions are for 320x180 and ids point to SVG entries (objects/bed, character:boy and so on) while the dust area is 320x180. Desired: objects use room/* ids, the boy uses character:boy-sheet with idle, walk and interact, and positions fit 480x270. Expected: no .svg path in manifest or content. Why: it is the Done-when condition.

## Acceptance criteria
- Given bedroom.yaml, when asset refs are collected, then all are PNG manifest ids and planPreload reports none unknown
- Given manifest.json, when paths are listed, then no path ends in .svg
- Given every object, when its position plus sprite size is computed, then it lies inside 480x270
- Given the boy, when idle, walk and interact resolve, then they use character:boy-sheet frame sets of 4, 6 and 4 frames


## Scope
- In scope: bedroom.yaml
- In scope: manifest.json svg entry removal
- Out of scope: Dialogue text, flags, new story
- Preserve: Object ids, action ids, events, flags and persistentState/visibleWhen rules


## Technical constraints
- Scene content stays data-driven
- 480x270 native resolution
- Decor objects use layer background/furniture with actions []


## Dependencies
- R1


## Definition of done
- Content validates through sceneSchema and validateWorld


## Clarifying questions
- None
