---
id: "01M85A0HWFEPCNB3903A03PF1X"
kind: unit
parent: 01M85A0HWE9R8E4D8FQX8ECQ62
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Verify: BootScene NPC spawn and characterClick unit tests

Extend the Phaser-mocked character suite with a second NPC that has an interaction.

## Acceptance criteria
- Two sprites spawn at their positions and idle.
- characterClick emitted only for NPCs with interaction.


## Scope
- In scope: game/frontend/tests/bootSceneCharacters.test.ts
- Out of scope: product code
- Preserve: Existing tests in the file


## Technical constraints
- Reuse the existing vi.mock('phaser') and vi.mock content fixtures; no real Phaser


## Definition of done
- Tests pass


## Clarifying questions
- None
