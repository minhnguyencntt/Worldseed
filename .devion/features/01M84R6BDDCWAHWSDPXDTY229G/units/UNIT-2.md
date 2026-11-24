---
id: "01M84R6BDE7HVQB8E1DZ2FDG8J"
kind: unit
parent: 01M84R6BDEKYWKF580D3038DP2
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Act: Add books and secret door state SVGs with manifest entries

Create books, secret-door-closed and secret-door-open SVGs and manifest entries.

## Acceptance criteria
- Three files exist
- Three entries with matching dimensions and bounds


## Scope
- In scope: SVGs
- In scope: manifest.json
- Out of scope: tests
- Preserve: existing entries


## Technical constraints
- Door states 40x80
- New file: `game/public/assets/worlds/the-boys-room/objects/books.svg`
- New file: `game/public/assets/worlds/the-boys-room/objects/secret-door-closed.svg`
- New file: `game/public/assets/worlds/the-boys-room/objects/secret-door-open.svg`
- Code path: `game/public/assets/worlds/the-boys-room/manifest.json`


## Definition of done
- Files exist and entries added


## Clarifying questions
- None
