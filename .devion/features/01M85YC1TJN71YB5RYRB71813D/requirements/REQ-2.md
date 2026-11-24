---
id: "01M85YC1TJ6GRVQD0YHX8H1SEM"
kind: requirement
parent: 01M85YC1TJN71YB5RYRB71813D
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# REQ · Inventory is a 3x2 grid of slots with item icons and names, empty slots included

Context: inventory renders a ul of ids or the text Empty. Desired behavior: a grid of exactly six sf-frame-slot cells, 3 columns by 2 rows; each filled slot shows the 16x16 icon from manifest id item/<id> and a readable name; remaining slots are empty placeholders. Expected result: layout is stable at any inventory size up to six.

## Acceptance criteria
- Given inventory ['old-key'], then 6 slots render, slot 1 has an img from item/old-key and the name 'Old Key', 5 slots are marked empty.
- Given empty inventory, then 6 empty slots render and no img exists.
- Given an item with no manifest icon, then its name shows without an img.
- Grid has 3 columns (grid-cols-3).


## Scope
- In scope: inventory grid
- In scope: slot builder helper
- Out of scope: more than six items scrolling rules
- Out of scope: new item art
- Preserve: aria-label Inventory
- Preserve: item icon PNGs and manifest entries


## Technical constraints
- Icons come from existing generated item/* manifest entries.
- Shared palette and tokens only.


## Dependencies
- INT


## Definition of done
- Always six slots
- Icons and names from game state


## Clarifying questions
- None
