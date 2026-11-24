---
id: "01M84PNYJXDQ11RDMN62D5AMCN"
kind: requirement
parent: 01M84PNYJWJKMZZD8KEB85A040
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# REQ · Runtime validators return typed data or path-named errors without throwing

Context: schemas alone throw on failure. Desired behavior: validator functions return a discriminated result with typed data or an error list naming field paths, plus duplicate asset id detection, exported via index.ts. Expected result: callers can validate untrusted manifest JSON safely. Why: handle bad content gracefully.

## Acceptance criteria
- Given a valid manifest, when parseManifest runs, then ok is true and data is typed
- Given an invalid manifest, when parseManifest runs, then ok is false and errors contain the failing field path
- Given two assets with the same id, when parseManifest runs, then ok is false and an error names the duplicate id
- Given non-object input, when parseManifest runs, then it returns ok false without throwing


## Scope
- In scope: game/src/assets/manifest/validate.ts
- In scope: game/src/assets/manifest/index.ts
- Out of scope: Filesystem loading
- Preserve: Existing src modules


## Technical constraints
- Use safeParse


## Dependencies
- REQ2


## Definition of done
- Validators and index exported


## Clarifying questions
- None
