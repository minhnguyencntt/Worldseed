---
id: "01M8583P0BQMX1RQNPFV7DTX5F"
kind: requirement
parent: 01M8583P0BTSVT1CCEACTVD2JE
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# REQ · bootSceneFallback test types the particles mock call signature

Context: tests/bootSceneFallback.test.ts line 89 reads particles.mock.calls[0][2] but vi.fn(() => emitter) is typed with an empty tuple (TS2493). Its content mock also lacks sceneSpec. Desired behavior: typed mock signature and sceneSpec in the mock.

## Acceptance criteria
- Given particles = vi.fn((_x: number, _y: number, _key: string) => emitter), When tsc runs, Then no TS2493 at line 89
- Given the content mock includes sceneSpec, When the suite runs, Then all fallback tests pass


## Scope
- In scope: BootScene.resolveKey explicit signature
- In scope: bootSceneFallback.test.ts
- Out of scope: phaserHost.test.tsx
- Preserve: fallback texture key behavior


## Definition of done
- No TS2493 in bootSceneFallback.test.ts


## Clarifying questions
- None
