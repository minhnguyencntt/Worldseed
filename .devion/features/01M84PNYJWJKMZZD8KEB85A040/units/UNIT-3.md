---
id: "01M84PNYJXM8YJ7Y200W0GM29N"
kind: unit
parent: 01M84PNYJXDQ11RDMN62D5AMCN
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Act: Add parseManifest validators and index exports

Implement non-throwing validators using the schemas and export the public API.

## Acceptance criteria
- parseManifest returns {ok:true,data} or {ok:false,errors}
- Duplicate asset ids are reported in the errors list


## Scope
- In scope: game/src/assets/manifest/validate.ts
- In scope: game/src/assets/manifest/index.ts
- Out of scope: loader
- Preserve: schema.ts


## Technical constraints
- New file: `game/src/assets/manifest/validate.ts`
- New file: `game/src/assets/manifest/index.ts`


## Definition of done
- Compiles under tsc --noEmit


## Clarifying questions
- None
