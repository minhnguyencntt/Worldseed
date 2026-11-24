---
id: "01M844TV9Q3QP402GEB66SED4C"
kind: unit
parent: 01M844TV9QW0YRM90MDWP5PGTA
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Act: Name the StoryPanel dialogue region

Give the dialogue section in StoryPanel the accessible name Dialogue so it can be queried as a region.

## Acceptance criteria
- Given a node, when StoryPanel renders, then a region named Dialogue exists
- Given node undefined, when StoryPanel renders, then no Dialogue region exists


## Scope
- In scope: StoryPanel dialogue section
- Out of scope: Inventory section
- Preserve: class dialogue
- Preserve: choice buttons


## Technical constraints
- Code path: `game/frontend/src/components/StoryPanel.tsx`


## Dependencies
- R2


## Definition of done
- aria-label=Dialogue on the dialogue section


## Clarifying questions
- None
