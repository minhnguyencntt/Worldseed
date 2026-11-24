---
id: "01M857F2G20SHH6F1YFF2TYCWG"
kind: requirement
parent: 01M857F2G1S6W3EW16HHWJP6G3
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# REQ · BootScene tests and sources have no implicit-any errors

Context: tsc reports TS7006 for the 'a' parameter in BootScene.preload and the 'o' parameter in bootSceneBuild.test.ts. Desired: explicit types. Expected: tsc clean for these files. Why: tests compile under strict mode.

## Acceptance criteria
- Given BootScene.preload, When manifest.assets.find is called, Then the parameter has an explicit type
- Given bootSceneBuild.test.ts, When it maps sceneSpec.objects, Then the parameter is typed and the test passes


## Scope
- In scope: BootScene.ts preload
- In scope: content.ts type export
- In scope: bootSceneBuild.test.ts
- Out of scope: behavior changes
- Preserve: preload loading logic


## Technical constraints
- Types come from @game/content/schema


## Definition of done
- No TS7006 in these files
- Tests pass


## Clarifying questions
- None
