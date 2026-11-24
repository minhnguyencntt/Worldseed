---
id: "01M858C7X9KQWTCPQ1PFTR5TEW"
kind: requirement
parent: 01M858C7X83660B1TAD16SFCD5
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# REQ · Fallback test reads the particles call arguments with a typed mock

Context: bootSceneFallback.test.ts line 89 reads particles.mock.calls[0][2] from an untyped vi.fn(). Desired behavior: effectContext passes the resolved key as third argument to scene.add.particles and the test types the mock signature. Expected result: no TS2493 and the fallback assertion still holds.

## Acceptance criteria
- Given a dust effect with an unknown asset, when createEffect runs, then particles receives the fallback key as third argument
- Given the typed mock, when tsc runs, then calls[0][2] compiles with no TS2493


## Scope
- In scope: game/frontend/src/phaser/effectContext.ts dust branch
- Out of scope: ambientLight branch
- Preserve: dust emitter options and depth


## Technical constraints
- Phaser 3.90 particles(x, y, texture, config) signature


## Definition of done
- Fallback test compiles and passes


## Clarifying questions
- None
