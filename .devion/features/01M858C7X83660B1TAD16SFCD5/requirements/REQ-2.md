---
id: "01M858C7X9RRHZB84P976QTN84"
kind: requirement
parent: 01M858C7X83660B1TAD16SFCD5
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# REQ · BootScene preload and build test callbacks have explicit types

Context: BootScene.ts line 42 (manifest.assets.find callback 'a') and bootSceneBuild.test.ts line 138 (flatMap callback 'o') have implicit any. Desired behavior: both parameters carry explicit types. Expected result: no TS7006 at those lines.

## Acceptance criteria
- Given BootScene.preload, when tsc runs, then the 'a' parameter has an explicit type and no TS7006 is reported
- Given bootSceneBuild.test.ts, when tsc runs, then the 'o' parameter is typed and the suite passes with buildScene receiving the mocked sceneSpec


## Scope
- In scope: game/frontend/src/phaser/BootScene.ts
- Out of scope: manifest schema changes
- Preserve: planPreload usage and image loading


## Technical constraints
- Use types already exported from @game/assets/manifest or the content module; do not invent new ones


## Definition of done
- TS7006 cleared at both sites


## Clarifying questions
- None
