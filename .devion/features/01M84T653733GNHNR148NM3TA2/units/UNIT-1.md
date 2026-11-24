---
id: "01M84T6537706VR5FGDE69V8GW"
kind: unit
parent: 01M84T6537DBT4A27GNM8ZT8DW
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Act: Add trackedNodeModulesPaths helper

Create game/frontend/src/lib/untrackNodeModules.ts with the pure trackedNodeModulesPaths function.

## Acceptance criteria
- Function filters by node_modules path segment
- Function returns [] when none match


## Scope
- In scope: New module
- Out of scope: Tests
- Preserve: gitignore.ts


## Technical constraints
- New file: `game/frontend/src/lib/untrackNodeModules.ts`


## Definition of done
- trackedNodeModulesPaths exported


## Clarifying questions
- None
