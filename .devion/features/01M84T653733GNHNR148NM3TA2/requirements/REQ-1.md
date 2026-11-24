---
id: "01M84T6537DBT4A27GNM8ZT8DW"
kind: requirement
parent: 01M84T653733GNHNR148NM3TA2
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# REQ · A pure helper reports tracked node_modules paths from a file listing

Context: no helper exists yet to identify dependency paths in a git ls-files listing. Desired behavior: pure function returning only entries with a node_modules path segment. Why: the cleanup and guard both need it.

## Acceptance criteria
- Given a mixed listing, when filtered, then only paths with a node_modules segment are returned
- Given a listing without node_modules, when filtered, then an empty array is returned


## Scope
- In scope: trackedNodeModulesPaths
- Out of scope: Running git
- Preserve: src/lib/gitignore.ts


## Technical constraints
- Pure function, segment match not substring match


## Definition of done
- Helper exported and unit tested


## Clarifying questions
- None
