---
id: "01M843H7J6H3R1PKJXC4B6PQGN"
kind: unit
parent: 01M843H7J664TFSMX22768GX91
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Act: Port strict field validation into loader.ts loadWorld

Context: loader.ts L10-L25 reads world.yaml and scenes with plain casts. Desired behavior: reuse world.ts helpers isRecord, requireString and requireStringArray and its scene id mismatch check. Expected result: loadWorld throws descriptive errors for malformed content and returns scenes as SceneDef[].

## Acceptance criteria
- loadWorld throws when world.yaml lacks a string id, title or startScene
- loadWorld throws naming the missing file, such as s2.yaml, when a listed scene file is absent
- loadWorld throws when a scene file's id differs from the listed id
- loadWorld returns LoadedWorld whose scenes is an array in world.yaml order


## Scope
- In scope: loader.ts loadWorld and helpers
- Out of scope: validateWorld
- Out of scope: tests
- Preserve: export names loadWorld, validateWorld, LoadedWorld


## Technical constraints
- Missing scene error message must still contain '<sceneId>.yaml'
- Code path: `backend/game/src/content/loader.ts`


## Dependencies
- REQ1


## Definition of done
- npm run typecheck passes in backend/game
- loadWorld on the-boys-room still succeeds


## Clarifying questions
- None
