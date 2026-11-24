---
id: "01M84ST796Q75MPB2RB9EZ50W8"
kind: unit
parent: 01M84ST795SDH43CESX35QB2YQ
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Act: Add trackedNodeModulesPaths helper

Create a module exporting trackedNodeModulesPaths that filters paths having a node_modules segment.

## Acceptance criteria
- Given mixed paths, then only node_modules paths are returned
- Given none, then an empty array is returned


## Scope
- In scope: game/frontend/tools/trackedPaths.ts
- Out of scope: git invocation
- Preserve: Existing src


## Technical constraints
- Pure function
- New file: `game/frontend/tools/trackedPaths.ts`


## Definition of done
- Helper exported


## Clarifying questions
- None
