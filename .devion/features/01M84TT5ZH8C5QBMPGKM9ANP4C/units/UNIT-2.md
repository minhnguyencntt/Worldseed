---
id: "01M84TT5ZHEQ5MDDR2S2Q2WH36"
kind: unit
parent: 01M84TT5ZHQ5HYQS101RYKC1NG
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Act: Add runGuard and the assertNoTrackedNodeModules CLI script

runGuard(run, log) uses checkTrackedFiles, logs each offender and returns exit code.

## Acceptance criteria
- runGuard returns 1 with offenders, 0 otherwise.
- Script calls process.exit(runGuard(...)).


## Scope
- In scope: helper module
- In scope: new script
- Out of scope: tests
- Preserve: existing exports


## Technical constraints
- Real runner: execFileSync('git', args, {encoding:'utf8', maxBuffer: 256*1024*1024})
- Code path: `game/frontend/src/lib/trackedNodeModules.ts`
- New file: `game/frontend/scripts/assertNoTrackedNodeModules.ts`


## Dependencies
- ACT1


## Definition of done
- Script file created


## Clarifying questions
- None
