---
id: "01M84TCKGGF03PX1YWM3HSV6J1"
kind: requirement
parent: 01M84TCKGFDT1HRJTYATBJ2CHZ
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# REQ · untrackNodeModules untracks via git rm -r --cached and unstages vitest results.json, with a CLI script

Context: node_modules files and the vitest results.json cache are tracked/staged. Desired: untrackNodeModules(run) issues git rm -r --cached for node_modules and unstages node_modules/.vite/vitest/results.json; npm script runs it against real git.

## Acceptance criteria
- Given a fake runner, when untrackNodeModules runs, then it calls git with args including 'rm','-r','--cached' and 'node_modules'.
- Given a fake runner, when it runs, then no command deletes files from disk (no plain 'rm' or '-f' without --cached) and results.json is unstaged.


## Scope
- In scope: untrackNodeModules in the same module
- In scope: scripts/untrackNodeModules.ts CLI
- In scope: package.json script untrack:node-modules
- Out of scope: Executing the cleanup in tests
- Preserve: Existing package.json scripts


## Technical constraints
- Real runner uses node:child_process execFileSync without shell


## Dependencies
- REQ1


## Definition of done
- Function and script exist


## Clarifying questions
- None
