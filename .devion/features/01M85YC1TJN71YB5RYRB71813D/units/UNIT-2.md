---
id: "01M85YC1TJFFN9D0E9CR5EXVAC"
kind: unit
parent: 01M85YC1TJ6GRVQD0YHX8H1SEM
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Act: Add buildInventorySlots and render the 3x2 inventory grid

Pure helper maps inventory ids to six slot descriptors; StoryPanel renders them in a grid.

## Acceptance criteria
- buildInventorySlots returns length 6
- Names are humanised ids
- Grid uses grid-cols-3


## Scope
- In scope: storyPanelData.ts
- In scope: StoryPanel inventory section
- Out of scope: log
- Preserve: Inventory aria-label


## Technical constraints
- React, TypeScript, Tailwind stay.
- New file: `game/frontend/src/lib/storyPanelData.ts`
- Code path: `game/frontend/src/components/StoryPanel.tsx`


## Dependencies
- REQ2
- ACT1


## Definition of done
- Grid always renders six slots


## Clarifying questions
- None
