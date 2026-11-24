---
id: "01M84T6537GC5YKDGR64QW90RD"
kind: requirement
parent: 01M84T653733GNHNR148NM3TA2
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# REQ · Cleanup untracks dependency paths with git rm --cached and keeps them on disk

Context: 15,329 dependency files are tracked. Desired behavior: a cleanup lists tracked files via an injected git runner, filters them, and runs git rm -r --cached for the matching top-level node_modules directories, never deleting from disk. Why: stops vendored files showing as tracked changes.

## Acceptance criteria
- Given tracked node_modules paths, when cleanup runs, then git is called with rm -r --cached --ignore-unmatch -- and the node_modules roots
- Given no tracked node_modules paths, when cleanup runs, then git rm is not called
- Given any call, then no --force or filesystem-deleting argument is passed


## Scope
- In scope: untrackNodeModules with injected GitRunner
- Out of scope: Committing the result
- Preserve: Files on disk


## Technical constraints
- Git args passed as an array, no shell string


## Dependencies
- r1


## Definition of done
- Cleanup exported and unit tested with a fake runner


## Non-functional requirements
- Batch roots, not one call per file, so it stays fast with 15,000 files


## Clarifying questions
- None
