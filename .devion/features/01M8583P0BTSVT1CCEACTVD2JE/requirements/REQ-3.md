---
id: "01M8583P0BWG59KN6J2NRAAF7M"
kind: requirement
parent: 01M8583P0BTSVT1CCEACTVD2JE
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# REQ · BootScene.preload callback has an explicit asset type

Context: manifest.assets.find((a) => ...) in BootScene.preload has an implicitly any parameter a. Desired behavior: annotate it. Expected result: no TS7006 at BootScene.ts line 42 and preload loads the same images.

## Acceptance criteria
- Given a typed callback parameter, When tsc runs, Then no TS7006 is reported in BootScene.ts
- Given bootScenePreload tests, When run, Then they still pass unchanged


## Scope
- In scope: BootScene.preload callback typing
- Out of scope: manifest schema typing
- Preserve: planPreload usage and load.image calls


## Definition of done
- BootScene.ts has no implicit any at line 42


## Clarifying questions
- None
