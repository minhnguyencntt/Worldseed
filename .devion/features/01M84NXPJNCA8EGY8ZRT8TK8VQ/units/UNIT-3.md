---
id: "01M84NXPJPK46H7G9RH72RZF7K"
kind: unit
parent: 01M84NXPJN7Q60E5W6Q8KG3E5X
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Act: Remove RoundBadge and Countdown usage from App

Remove RoundBadge and Countdown from App scene slot.

## Acceptance criteria
- App.tsx has no RoundBadge or Countdown references.
- The scene fragment in App.tsx begins with SceneView.


## Scope
- In scope: App.tsx
- Out of scope: Component files
- Preserve: Rest of scene


## Technical constraints
- Code path: `game/frontend/src/App.tsx`


## Dependencies
- ACT2


## Definition of done
- Imports and JSX removed


## Clarifying questions
- None
