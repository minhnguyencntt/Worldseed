---
id: "01M84TT5ZH72DXXR5CX753ENR2"
kind: unit
parent: 01M84TT5ZH2T6Z6RW33GMF67VH
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Act: Add parseGitLsFiles and checkTrackedFiles to the helper file

Extend the existing helper module with parseGitLsFiles and checkTrackedFiles using the existing GitRunner type.

## Acceptance criteria
- parseGitLsFiles splits on \0 and filters empty strings.
- checkTrackedFiles calls run(['ls-files','-z']) and returns node_modules or .vite/vitest paths.


## Scope
- In scope: helper module
- Out of scope: tests
- Out of scope: CLI
- Preserve: existing exports


## Technical constraints
- No duplicate exports
- Code path: `game/frontend/src/lib/trackedNodeModules.ts`


## Definition of done
- Both functions exported once; tsc clean for the file


## Clarifying questions
- None
