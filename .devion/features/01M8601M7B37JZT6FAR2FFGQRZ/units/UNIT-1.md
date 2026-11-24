---
id: "01M8601M7B7151WDX339SMY19J"
kind: unit
parent: 01M8601M7BKRMAF22Y0N8NKBCB
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Act: Switch GameLayout to a 3fr/1fr split

Change the md grid template in GameLayout so the scene gets three quarters of the width, keeping every other class.

## Acceptance criteria
- Given GameLayout, when rendered, then the root has md:grid-cols-[3fr_1fr]
- Given narrow classes, when inspected, then max-md drawer classes are unchanged


## Scope
- In scope: GameLayout.tsx
- Out of scope: other components
- Preserve: drawer classes


## Technical constraints
- Tailwind stays
- Code path: `game/frontend/src/components/GameLayout.tsx`


## Dependencies
- REQ-LAYOUT


## Definition of done
- Class swapped


## Clarifying questions
- None
