---
id: "01M85AR74T25N8SFD9M8VP6D38"
kind: unit
parent: 01M85AR74TJFZ28MYMPHPEB2GH
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Act: Check scene characters in validateWorld

In game/src/content/loader.ts validateWorld, inside the for (const scene of world.scenes) loop, iterate scene.characters ?? [] with index and push a path-tagged error for ids not in the existing characters Set.

## Acceptance criteria
- Unknown scene character ids push scenes[<sceneId>].characters[<index>].id: unknown character <id>
- Known ids and scenes without characters push nothing


## Scope
- In scope: validateWorld in game/src/content/loader.ts
- Out of scope: tests
- Preserve: existing checks


## Technical constraints
- Use the existing characters Set
- Code path: `game/src/content/loader.ts`


## Definition of done
- validateWorld reports unknown scene character ids


## Clarifying questions
- None
