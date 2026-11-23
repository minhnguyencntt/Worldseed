---
id: "01M8414WGSGMX35MGQ74B0GN0X"
kind: unit
parent: 01M8414WGR17QT0BMYRJPZ02TC
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Verify: Game world loader and runtime wiring unit tests

Context: ACT-GAME added loader/runtime without tests.
Desired behavior: Unit tests parse fixture YAML string mirroring world-content.yaml contract and wire createRuntime; invalid YAML missing id throws.
Expected result: Filtered vitest for game content/runtime tests passes with no filesystem reads of the real repo.
Why: Covers REQ-GAME loader and runtime/content separation wiring.

## Acceptance criteria
- Given fixture YAML matching world-content.yaml fields, when loadWorldFromYaml runs, then id is the-boys-room, title is The Boy's Room, startingScene is bedroom.
- Given createRuntime('the-boys-room','bedroom'), when called, then RuntimeState matches those ids.
- Given YAML missing id, when loadWorldFromYaml runs, then it throws an Error naming id.


## Scope
- In scope: loadWorld.test.ts
- In scope: runtime.test.ts
- In scope: package.json test:game script if needed
- Out of scope: Browser e2e
- Out of scope: Reading live disk outside test fixture strings
- Preserve: Loader/runtime product APIs from ACT-GAME


## Technical constraints
- Unit tests only; YAML fixture must mirror world-content.yaml field contract
- No network I/O


## Dependencies
- ACT-GAME


## Definition of done
- Tests exist
- Filtered test command passes


## Clarifying questions
- None
