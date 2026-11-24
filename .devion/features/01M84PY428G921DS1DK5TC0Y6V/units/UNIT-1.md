---
id: "01M84PY4285HNB68MY7FRN5PST"
kind: unit
parent: 01M84PY428PYD7R706RQS8TARH
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Act: Add object, scene and world zod schemas

Create zod schemas and a non-throwing parseWorldContent mirroring manifest/index.ts parseManifest.

## Acceptance criteria
- objectSchema validates all required fields
- parseWorldContent returns path-named errors


## Scope
- In scope: new schema file
- Out of scope: tests
- Preserve: manifest schema


## Technical constraints
- Use zod
- New file: `game/src/content/schema.ts`


## Definition of done
- Schemas exported with inferred types


## Clarifying questions
- None
