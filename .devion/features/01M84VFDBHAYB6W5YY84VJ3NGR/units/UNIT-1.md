---
id: "01M84VFDBHFXF8R8XYM4NYAKGX"
kind: unit
parent: 01M84VFDBH8B1SQYMYQMDMFYB7
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Act: Add untrackAndVerify to the trackedNodeModules helper

Add untrackAndVerify(run: GitRunner) to src/lib/trackedNodeModules.ts after untrackNodeModules, reusing checkTrackedFiles and untrackNodeModules.

## Acceptance criteria
- untrackAndVerify returns {before, after:0} when nothing remains
- untrackAndVerify throws listing leftover paths when the index still has them


## Scope
- In scope: src/lib/trackedNodeModules.ts
- Out of scope: Tests
- Preserve: Existing exports


## Technical constraints
- Dedupe with a Set
- Code path: `game/frontend/src/lib/trackedNodeModules.ts`


## Definition of done
- Function exported and typecheck passes


## Clarifying questions
- None
