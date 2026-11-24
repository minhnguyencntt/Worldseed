---
id: "01M843NJMD15TAATY75QPRNCVX"
kind: unit
parent: 01M843NJMDS7XG831NQ6KW7HPB
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Verify: game/ layout and content load unit tests

Context: loader.loadWorld(worldDir) validates world.yaml and scenes. Desired behavior: tests prove the moved layout exists and the real world loads. Expected result: tests pass from game/.

## Acceptance criteria
- Given game/, when the layout test runs, then required directories exist and backend/game does not
- Given game/content/worlds/the-boys-room, when loadWorld is called, then it returns without throwing
- Given the existing suite files, when run from game/, then they pass


## Scope
- In scope: new layout.test.ts
- In scope: existing tests run
- Out of scope: e2e or live servers
- Preserve: existing tests


## Technical constraints
- Vitest only, filesystem reads of repo files only, no network


## Dependencies
- ACT1


## Definition of done
- layout.test.ts passes


## Clarifying questions
- None
