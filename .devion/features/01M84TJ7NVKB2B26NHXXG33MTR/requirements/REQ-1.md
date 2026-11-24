---
id: "01M84TJ7NV1SCVN59V47FDKCT9"
kind: requirement
parent: 01M84TJ7NVKB2B26NHXXG33MTR
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# REQ · Guard reports tracked dependency and test-cache paths from git ls-files output

Context: trackedNodeModulesPaths only matches a node_modules segment and nothing reads real git output. Desired: parse NUL-separated git ls-files output and flag node_modules or .vite segments. Why: the guard needs real tracked file lists.

## Acceptance criteria
- Given paths including node_modules/a.js and src/.vite/x.json, when filtered, then both are returned and src/a.ts is not
- Given git ls-files -z output, when parsed, then empty entries are dropped and paths split on NUL


## Scope
- In scope: src/lib/trackedNodeModules.ts additions
- Out of scope: running git in tests
- Preserve: existing exports


## Technical constraints
- Pure functions; git runner injected via GitRunner type


## Definition of done
- Helpers exported and typed


## Clarifying questions
- None
