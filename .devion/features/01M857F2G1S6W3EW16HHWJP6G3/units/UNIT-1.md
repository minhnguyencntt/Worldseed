---
id: "01M857F2G2XNC8AXABXQF41NVZ"
kind: unit
parent: 01M857F2G2DWBWTQ1CAXH88T1R
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Act: Type the manifest asset callback in BootScene.preload

BootScene.preload uses manifest.assets.find((a) => ...) which is implicitly any under mocks; give it an explicit type so mocked content shapes compile.

## Acceptance criteria
- Given BootScene.preload, When compiled, Then no implicit any on a
- Given preload runs, When an image asset is planned, Then it is loaded as before


## Scope
- In scope: BootScene.ts preload
- Out of scope: logic changes
- Preserve: load.image calls


## Technical constraints
- Use the AssetEntry type from @game/content/schema
- Code path: `game/frontend/src/phaser/BootScene.ts`


## Definition of done
- Callback parameter typed


## Clarifying questions
- None
