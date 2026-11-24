---
id: "01M858NJ3ADQ0CHBXJASX2BFY3"
kind: requirement
parent: 01M858NJ3A20HNY7ND1BV4WHXF
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# REQ · Frontend declares zod so game sources resolve

game/src/content/schema.ts and game/src/assets/manifest/schema.ts import zod, and game/frontend compiles them via the @game alias, but frontend package.json lacks zod, producing TS2307 and unresolved-import failures. Declare it with the same range as game/package.json.

## Acceptance criteria
- Given game/frontend/package.json, when dependencies are read, then zod matches ^3.23.8
- Given game/package.json, when zod ranges are compared, then both are identical


## Scope
- In scope: game/frontend/package.json dependencies
- Out of scope: Lockfile regeneration by hand
- Preserve: Existing dependency versions


## Technical constraints
- Same zod range as game/package.json


## Definition of done
- zod declared in frontend package.json


## Clarifying questions
- None
