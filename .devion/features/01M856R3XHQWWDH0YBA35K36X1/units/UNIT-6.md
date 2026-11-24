---
id: "01M856R3XJE1YF8ENF0CV5E5K6"
kind: unit
parent: 01M856R3XHA7BGZAFG9X6B0WT4
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Verify: BootScene state sync and objectClick forwarding

With buildScene mocked to return fake objects, assert sync and objectClick behavior.

## Acceptance criteria
- create syncs with non-null state
- onStateChange syncs new state and ignores null
- onInteract emits objectClick


## Scope
- In scope: New test file
- Out of scope: Product code
- Preserve: Existing tests


## Technical constraints
- Real useGameStore with setState; phaserToReact spied; same mocks as bootSceneBuild.test.ts


## Dependencies
- A3


## Definition of done
- Tests pass


## Clarifying questions
- None
