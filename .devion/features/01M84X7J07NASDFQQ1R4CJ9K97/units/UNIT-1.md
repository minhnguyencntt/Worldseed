---
id: "01M84X7J08GGA9YZADN6E6W7WQ"
kind: unit
parent: 01M84X7J0804WRYFB9Y0FCMK94
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Act: Add interaction helper module

Add pure functions pointInBounds, availableActions, isActivationKey and nextFocusIndex reusing evaluateAll.

## Acceptance criteria
- Module exports the four functions with typed signatures
- availableActions uses evaluateAll on each action's conditions


## Scope
- In scope: New interaction.ts
- Out of scope: Tests
- Out of scope: SceneObject changes
- Preserve: systems/conditions.ts


## Technical constraints
- Import types from ../content/schema and ../state/types
- New file: `game/src/systems/interaction.ts`


## Definition of done
- interaction.ts compiles under tsc --noEmit


## Clarifying questions
- None
