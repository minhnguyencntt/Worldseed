---
id: "01M84TCKGGRHTNK9RB7XVQW669"
kind: unit
parent: 01M84TCKGGF03PX1YWM3HSV6J1
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Act: Add untrackNodeModules cleanup and CLI script

Add untrackNodeModules and a CLI entry running against real git.

## Acceptance criteria
- Uses git rm -r --cached
- Unstages vitest results.json
- Script entry exists


## Scope
- In scope: Function, CLI, package.json script
- Out of scope: Tests
- Preserve: Other scripts


## Technical constraints
- No shell interpolation
- New file: `game/frontend/src/lib/trackedNodeModules.ts`
- New file: `game/frontend/scripts/untrackNodeModules.ts`
- Code path: `game/frontend/package.json`


## Definition of done
- Function, CLI and script exist


## Clarifying questions
- None
