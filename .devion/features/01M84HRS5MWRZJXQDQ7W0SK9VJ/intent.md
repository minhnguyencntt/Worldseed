---
id: "01M84HRS5MWRZJXQDQ7W0SK9VJ"
kind: intent
parent: null
status: draft
links: []
agent: null
source: llm
evidence: {"project_id":"944dfe9c-3760-4ab1-81a3-865a561626d8"}
---
# SG-1 · Remove worker module and execution backend

Context: Worldseed is a game and contribution project, not a development platform. The separate Go module backend/worker (with its own go.mod) and the package backend/internal/execution (imported by backend/internal/server/server.go) are development automation. Desired behavior: both are deleted, nothing under backend/ imports them, and the remaining packages (contribution, round, player, world, admin, gitrepo, safepath) still compile. Why: devion project workseed owns development automation.

## Acceptance criteria
- Given the repo after the change, when backend/worker is looked up, then the directory and its go.mod do not exist.
- Given the repo after the change, when backend/internal/execution is looked up, then the directory does not exist.
- Given the remaining backend packages, when they are built and tested, then they compile and pass, and no Go file under backend/ imports the worker module or internal/execution.


## Scope
- In scope: Delete backend/worker
- In scope: Delete backend/internal/execution and its handler
- In scope: Remove execution wiring and execution admin routes from backend/internal/server
- Out of scope: Frontend ExecutionPanel and admin UI removal
- Out of scope: Config key cleanup beyond what compiles
- Out of scope: Contribution handoff export format
- Preserve: backend/internal/contribution, round, player, world, admin, gitrepo, safepath
- Preserve: game/src, game/frontend, game/content


## Technical constraints
- Go module github.com/worldseed/storyforge/backend must keep building with go build ./...


## Definition of done
- All acceptance criteria are met
- Backend unit tests pass


## Clarifying questions
- None
