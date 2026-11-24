---
id: "01M85W67055Y600H1TN3MMT8B7"
kind: unit
parent: 01M85W67040N1DWBZAFHXB0R6G
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Act: Run art:generate to emit item PNGs and manifest entries

With ITEM_SOURCES in ART_SOURCES, run the existing art:generate script so mergeManifest adds six item/ entries and writes the PNGs. No generator code change is needed.

## Acceptance criteria
- Six PNGs exist under game/public/assets/worlds/the-boys-room/items/.
- manifest.json has six item/ entries of type image with 16x16 dimensions.
- Existing manifest entries are unchanged.


## Scope
- In scope: game/public/assets/worlds/the-boys-room/manifest.json
- In scope: Six item PNG files
- Out of scope: generateArt.ts changes
- Preserve: Other generated PNGs byte-identical


## Technical constraints
- Use npm run art:generate; deterministic output.
- Code path: `game/public/assets/worlds/the-boys-room/manifest.json`
- New file: `game/public/assets/worlds/the-boys-room/items/old-key.png`
- New file: `game/public/assets/worlds/the-boys-room/items/note.png`
- New file: `game/public/assets/worlds/the-boys-room/items/book.png`
- New file: `game/public/assets/worlds/the-boys-room/items/coin.png`
- New file: `game/public/assets/worlds/the-boys-room/items/flashlight.png`
- New file: `game/public/assets/worlds/the-boys-room/items/photo.png`


## Dependencies
- ACT1
- REQ2


## Definition of done
- git diff shows only new item files and manifest additions.


## Clarifying questions
- None
