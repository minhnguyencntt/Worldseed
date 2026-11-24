---
id: "01M8583P0BR71JQRW2JP70GD14"
kind: unit
parent: 01M8583P0BQMX1RQNPFV7DTX5F
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Act: Annotate BootScene.resolveKey return and parameter types

BootScene.resolveKey already takes id: string and returns string; confirm the explicit signature and the FALLBACK_KEY export stay so the fallback test can type its mocks.

## Acceptance criteria
- Given BootScene.resolveKey, When read, Then it is declared (id: string): string
- Given FALLBACK_KEY, When imported, Then it is still exported


## Scope
- In scope: BootScene.ts
- Out of scope: tests
- Preserve: fallback behavior


## Technical constraints
- Code path: `game/frontend/src/phaser/BootScene.ts`


## Definition of done
- Signature explicit and unchanged


## Clarifying questions
- None
