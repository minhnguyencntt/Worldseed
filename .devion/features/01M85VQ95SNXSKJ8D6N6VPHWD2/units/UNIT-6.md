---
id: "01M85VQ95T76H0G2R3TW9G2JGS"
kind: unit
parent: 01M85VQ95S84F32VZMMPMKN2PZ
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Verify: Scene content and manifest contain no svg and resolve to PNG ids

Spec-driven assertions on bedroom content and manifest. Content is parsed from the bundled yaml, no I/O mocks needed beyond that.

## Acceptance criteria
- No .svg in manifest or scene JSON
- planPreload unknown list is empty
- Object bounds inside 480x270
- Boy animations have 4, 6 and 4 frames


## Scope
- In scope: New frontend test
- Out of scope: Product code
- Preserve: Existing content tests


## Technical constraints
- Unit tests only


## Dependencies
- A2


## Definition of done
- Passes


## Clarifying questions
- None
