---
id: "01M84TJ7NVWY3X6XW3DVXG309S"
kind: unit
parent: 01M84TJ7NV1SCVN59V47FDKCT9
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Act: Add trackedDependencyPaths and parseGitLsFiles helpers

Add helpers so the guard can flag node_modules and .vite paths and read git ls-files -z output.

## Acceptance criteria
- trackedDependencyPaths flags node_modules and .vite segments only
- checkTrackedFiles(run) throws via assertion when git lists such paths


## Scope
- In scope: game/frontend/src/lib/trackedNodeModules.ts
- Out of scope: tests
- Preserve: existing three exports


## Technical constraints
- Keep GitRunner signature
- Code path: `game/frontend/src/lib/trackedNodeModules.ts`


## Definition of done
- Helpers exported


## Clarifying questions
- None
