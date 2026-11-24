---
id: "01M857STNXN550AG4ETT4E6AKN"
kind: unit
parent: 01M857STNX8EF8B9P4TRGEPVER
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Act: Confirm BootScene reads content only via the named content import

BootScene.ts imports manifest, scene and sceneSpec as named imports from '../runtime/content', so a vi.mock of that module controls them. Confirm and keep it; no behavior change.

## Acceptance criteria
- BootScene.ts imports content only from '../runtime/content'
- BootScene constructor stays zero-argument


## Scope
- In scope: BootScene.ts import line
- Out of scope: Behavior changes
- Preserve: create() and preload()


## Technical constraints
- No code change expected
- Code path: `game/frontend/src/phaser/BootScene.ts`


## Definition of done
- Import line confirmed unchanged


## Clarifying questions
- None
