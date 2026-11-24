---
id: "01M844TV9Q7355VWB6ZZCFWVZ4"
kind: unit
parent: 01M844TV9QMB3GSEN137790AHF
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Act: Name the StoryPanel inventory region

Give the inventory section in StoryPanel the accessible name Inventory so restored inventory is queryable as a region.

## Acceptance criteria
- Given StoryPanel renders, then a region named Inventory exists
- Given an empty inventory, then the Empty text is still shown inside it


## Scope
- In scope: StoryPanel inventory section
- Out of scope: Dialogue section
- Preserve: h2 Inventory heading
- Preserve: Empty text


## Technical constraints
- Code path: `game/frontend/src/components/StoryPanel.tsx`


## Dependencies
- R3


## Definition of done
- aria-label=Inventory on the inventory section


## Clarifying questions
- None
