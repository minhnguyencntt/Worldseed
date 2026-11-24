---
id: "01M84TCKGGMHVXN5S7KNTFK3EN"
kind: unit
parent: 01M84TCKGG2QAK2T72921KGZN9
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Act: Add assertNoTrackedNodeModules guard

Add assertNoTrackedNodeModules(paths) to the module.

## Acceptance criteria
- Throws naming offenders
- No throw when clean


## Scope
- In scope: Guard function
- Out of scope: Tests
- Preserve: Helper


## Technical constraints
- New file: `game/frontend/src/lib/trackedNodeModules.ts`


## Definition of done
- Guard exported


## Clarifying questions
- None
