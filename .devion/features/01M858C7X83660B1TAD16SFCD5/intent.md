---
id: "01M858C7X83660B1TAD16SFCD5"
kind: intent
parent: null
status: draft
links: []
agent: null
source: llm
evidence: {"project_id":"944dfe9c-3760-4ab1-81a3-865a561626d8"}
---
# SG-5.5.2 Clear BootScene test and source type errors

Context: the bootScene*.test.ts suites under game/frontend/tests mock '../src/runtime/content' and still fail tsc with TS2554, TS7006 and TS2493. Desired behavior: the mocks include sceneSpec and every cited call site type-checks. Expected result: the BootScene suites pass and none of the four cited errors remain. Why: the sub-goal SG-5.5.2 stays unmet until they do.

## Acceptance criteria
- Given bootSceneEffects.test.ts, when tsc runs, then lines 114 and 123 report no TS2554
- Given bootSceneBuild.test.ts and BootScene.ts, when tsc runs, then no TS7006 is reported at those lines
- Given bootSceneFallback.test.ts, when tsc runs, then no TS2493 is reported at line 89
- Given the bootScene suites, when vitest runs, then all tests pass


## Scope
- In scope: game/frontend BootScene tests and the two phaser sources they exercise
- Out of scope: zod install, manifestLoader.ts, phaserHost.test.tsx, tailwindConfig.test.ts type errors
- Preserve: BootScene runtime behavior
- Preserve: scene content and manifest files


## Technical constraints
- Unit tests mock all Phaser and content dependencies


## Definition of done
- The four cited errors are gone and the bootScene suites are green


## Clarifying questions
- None
