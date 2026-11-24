---
id: "01M85CF86VH31DXQAM3VDK30X2"
kind: unit
parent: 01M85CF86VWY4Z7Y5GSW2FXVNG
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Act: Add the shadcn-style Dialog wrapper

Create game/frontend/src/components/ui/dialog.tsx wrapping @radix-ui/react-dialog following button.tsx conventions.

## Acceptance criteria
- dialog.tsx exports Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogClose
- DialogContent renders overlay and content in a Portal and merges className with cn


## Scope
- In scope: New dialog.tsx
- Out of scope: Tests
- Preserve: button.tsx


## Technical constraints
- No new dependencies
- New file: `game/frontend/src/components/ui/dialog.tsx`


## Definition of done
- Named exports compile under tsc


## Clarifying questions
- None
