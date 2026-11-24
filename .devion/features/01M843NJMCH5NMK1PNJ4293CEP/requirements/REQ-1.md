---
id: "01M843NJMDS7XG831NQ6KW7HPB"
kind: requirement
parent: 01M843NJMCH5NMK1PNJ4293CEP
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# REQ · Runtime source, content and tests live under game/

Context: backend/game contains package.json, package-lock.json, tsconfig.json, vitest.config.ts, src/{content,engine,state,systems}, content/worlds/the-boys-room and tests. Desired behavior: these files exist at game/ with the same relative paths and nothing remains in backend/game. Expected result: imports like ../src/content/loader and content paths like ../content/worlds/the-boys-room resolve unchanged. Why: top-level game module per the goal.

## Acceptance criteria
- Given the move, when listing game/, then src/engine, src/state, src/systems, src/content, content/worlds/the-boys-room, tests, package.json, tsconfig.json and vitest.config.ts exist
- Given the move, when checking backend/, then backend/game does not exist
- Given game/content/worlds/the-boys-room, when loadWorld runs on it, then it loads without validation errors


## Scope
- In scope: moving all tracked files of backend/game
- Out of scope: editing file contents beyond path fixes
- Preserve: relative paths between src, tests and content


## Technical constraints
- git mv, not copy/delete


## Definition of done
- files moved
- old folder removed


## Clarifying questions
- None
