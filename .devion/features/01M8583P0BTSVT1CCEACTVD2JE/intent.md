---
id: "01M8583P0BTSVT1CCEACTVD2JE"
kind: intent
parent: null
status: draft
links: []
agent: null
source: llm
evidence: {"project_id":"944dfe9c-3760-4ab1-81a3-865a561626d8"}
---
# SG-5.5.2 Make BootScene tests type-check and pass with sceneSpec mock

Context: bootScene*.test.ts mock '../src/runtime/content', and tsc still reports constructor-arity, implicit-any and tuple errors in tests/bootSceneEffects, tests/bootSceneBuild, tests/bootSceneFallback and src/phaser/BootScene.ts. Desired behavior: mocks include sceneSpec and the four errors disappear. Expected result: the BootScene suites pass and tsc reports none of those errors. Why: the thin-wrapper refactor (SG-5.5) must stay verifiably typed.

## Acceptance criteria
- Given tsc --noEmit in game/frontend, When it runs, Then no error is reported at BootScene.ts line 42 or in bootSceneEffects, bootSceneBuild or bootSceneFallback tests
- Given the bootScene*.test.ts suites, When run with vitest, Then every suite mocks sceneSpec in the content mock and passes


## Scope
- In scope: game/frontend/src/phaser/BootScene.ts typing
- In scope: game/frontend/src/phaser/effectContext.ts
- In scope: game/frontend/src/runtime/content.ts type export
- In scope: bootScene*.test.ts typing
- Out of scope: zod or manifestLoader type errors
- Out of scope: postcss.config.js and phaserHost.test.tsx errors
- Out of scope: new gameplay behavior
- Preserve: BootScene runtime behavior
- Preserve: existing test assertions


## Technical constraints
- Phaser 3.90 APIs only
- No any casts to silence errors except existing 'as never' fakes


## Definition of done
- All four unmet errors are gone from tsc output
- BootScene suites pass


## Clarifying questions
- None
