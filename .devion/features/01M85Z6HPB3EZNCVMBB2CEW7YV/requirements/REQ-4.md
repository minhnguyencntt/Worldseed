---
id: "01M85Z6HPBQRGS07SJDFEQ8S58"
kind: requirement
parent: 01M85Z6HPB3EZNCVMBB2CEW7YV
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# REQ · The unused hotspot-over-image path is fully removed

Context: the SceneView component, HOTSPOTS and ASSET_PATHS have already been deleted from source; the remaining leftover is the unanchored ActionMenu component, its .action-menu use in App, and its CSS and test references. Desired: remove them and keep the name getSceneView (a data helper in src/engine/scene.ts) untouched. Expected result: a single interaction path through the Phaser scene overlay. Why: Done-when requires the hotspot path gone.

## Acceptance criteria
- Given the frontend source, When searched for ActionMenu, SceneView component, HOTSPOTS and ASSET_PATHS, Then no component, import or style references remain
- Given App renders, When an object is selected, Then only ObjectOverlay shows actions
- Given existing tests that referenced ActionMenu, When run, Then they assert ObjectOverlay instead


## Scope
- In scope: Delete ActionMenu.tsx
- In scope: Remove import and render in App
- In scope: Remove .action-menu CSS if present
- Out of scope: getSceneView data helper
- Out of scope: Engine scene.ts
- Preserve: useGame.view and act


## Technical constraints
- Do not touch .devion/worktrees
- Tests are unit tests with mocks


## Dependencies
- REQ2


## Definition of done
- ActionMenu.tsx removed and App compiles with tsc --noEmit


## Clarifying questions
- None
