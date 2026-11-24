---
id: "01M855V4N1JCEQFQZBX1GTRH62"
kind: requirement
parent: 01M855V4N1D6VPZ9JKZBKT7ZW1
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# REQ · BootScene preloads only the planned assets

Context: BootScene has no preload method and the frontend has no manifest. Desired: runtime/content.ts exposes the validated manifest and BootScene.preload loads only planned ids using manifest paths under assets/. Expected: unlisted manifest assets are never requested. Why: avoid unnecessary loading.

## Acceptance criteria
- Given scene objects and dust effect referencing known ids, when preload runs, then load.image is called once per planned id with the key equal to the id and url assets/<manifest path>
- Given a manifest asset not referenced by the scene, when preload runs, then no load call is made for it
- Given unknown refs in the plan, when preload runs, then a console.warn names each and nothing is queued for them


## Scope
- In scope: runtime/content.ts manifest export
- In scope: BootScene.preload
- Out of scope: audio loading
- Preserve: scene export


## Technical constraints
- Use parseManifest from @game/assets/manifest and planPreload from @game/engine/planPreload


## Definition of done
- preload queues only planned assets


## Clarifying questions
- None
