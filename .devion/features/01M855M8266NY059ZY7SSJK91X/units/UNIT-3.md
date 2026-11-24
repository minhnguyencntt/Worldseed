---
id: "01M855M826QMH7XXGYF3212A1Q"
kind: unit
parent: 01M855M826E3C405ZASCHH5B77
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Verify: planPreload unit tests

Write tests from the REQ1 spec using in-memory manifests and scenes only.

## Acceptance criteria
- Dedupe, unknown and empty cases are asserted
- The tests pass


## Scope
- In scope: game/tests/planPreload.test.ts
- Out of scope: Phaser
- Out of scope: Filesystem
- Preserve: Existing tests


## Technical constraints
- Build the fixture scene by spreading validScene from tests/fixtures/valid-world.ts, which matches the SceneDef type in src/state/types.ts


## Dependencies
- ACT1


## Definition of done
- Tests pass


## Clarifying questions
- None
