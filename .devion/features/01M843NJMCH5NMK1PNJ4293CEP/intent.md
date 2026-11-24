---
id: "01M843NJMCH5NMK1PNJ4293CEP"
kind: intent
parent: null
status: draft
links: []
agent: null
source: llm
evidence: {"project_id":"944dfe9c-3760-4ab1-81a3-865a561626d8"}
---
# SG-2.2 · Move game runtime from backend/game to top-level game/

Context: the game runtime (src/engine, src/state, src/systems, src/content, content/worlds/the-boys-room, tests, vitest/tsconfig/package.json) currently lives in backend/game. The goal specifies a top-level game/ module separate from the Go backend. Desired behavior: the same files live under game/ with unchanged relative layout, the old backend/game folder is gone, and the tests still pass. Why: separation of runtime concerns from the Go backend.

## Acceptance criteria
- Given the repo, when listing game/, then game/src/engine, game/src/state, game/src/systems, game/content and game/tests exist and backend/game does not
- Given game/, when running vitest there, then all existing tests pass with no changes to src logic
- Given .gitignore, when read, then it ignores game/node_modules/ and no longer references backend/game


## Scope
- In scope: git mv of backend/game to game
- In scope: fixing path references in config and ignore files
- Out of scope: changes to engine or system logic
- Out of scope: Go backend code
- Out of scope: frontend/worker modules
- Preserve: relative layout inside the module
- Preserve: existing test behavior
- Preserve: world.yaml and bedroom.yaml content


## Technical constraints
- Use git mv to retain history
- Relative imports in src and tests must keep working unchanged


## Definition of done
- game/ holds the full runtime
- backend/game removed
- tests pass from game/


## Clarifying questions
- None
