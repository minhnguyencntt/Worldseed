---
id: "01M84TCKGFRVYEYZ7K6SJ0VBEY"
kind: requirement
parent: 01M84TCKGFDT1HRJTYATBJ2CHZ
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# REQ · Pure helper trackedNodeModulesPaths filters paths containing a node_modules segment

Context: no helper exists in game/frontend/src/lib. Desired: export trackedNodeModulesPaths(paths: string[]): string[] that keeps paths with a 'node_modules' path segment. Why: basis for cleanup and guard.

## Acceptance criteria
- Given ['a/node_modules/x.js','src/a.ts'], when filtered, then only the first path is returned.
- Given 'src/my_node_modules_note.ts', when filtered, then it is not returned because it lacks a node_modules segment.


## Scope
- In scope: New module game/frontend/src/lib/trackedNodeModules.ts
- Out of scope: Running git
- Preserve: Other lib modules


## Technical constraints
- Pure function, no I/O


## Definition of done
- Helper exported and typed


## Clarifying questions
- None
