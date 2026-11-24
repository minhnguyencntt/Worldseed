---
id: "01M84T6537DBQNPBEZT7AT0RE7"
kind: unit
parent: 01M84T6537WP8JWV5WZ8JTZAH4
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Act: Add assertNoTrackedNodeModules guard

Add assertNoTrackedNodeModules(git) to the same module.

## Acceptance criteria
- Throws naming offending paths
- Resolves when clean


## Scope
- In scope: Guard
- Out of scope: Tests
- Preserve: Other exports


## Technical constraints
- New file: `game/frontend/src/lib/untrackNodeModules.ts`


## Dependencies
- a1


## Definition of done
- Guard exported


## Clarifying questions
- None
