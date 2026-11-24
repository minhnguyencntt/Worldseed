---
id: "01M84TCKGGNWMEGMY948K17C75"
kind: unit
parent: 01M84TCKGFRVYEYZ7K6SJ0VBEY
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Act: Add trackedNodeModulesPaths helper

Create src/lib/trackedNodeModules.ts exporting trackedNodeModulesPaths.

## Acceptance criteria
- Module exports trackedNodeModulesPaths
- Filters by node_modules segment


## Scope
- In scope: New lib module
- Out of scope: Tests
- Preserve: gitignore.ts


## Technical constraints
- New file: `game/frontend/src/lib/trackedNodeModules.ts`


## Definition of done
- Function exported and typechecks


## Clarifying questions
- None
