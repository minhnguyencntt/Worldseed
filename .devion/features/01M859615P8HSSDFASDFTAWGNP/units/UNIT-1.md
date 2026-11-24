---
id: "01M859615QDQ85W7A48BW77TWA"
kind: unit
parent: 01M859615PS01QZJMRTYYZT1JB
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Act: Add @game paths mapping to game/tsconfig.json

Add compilerOptions.paths so tsc resolves the alias already defined in vitest.config.ts.

## Acceptance criteria
- compilerOptions.paths['@game/*'] is ['./src/*']
- Other compiler options are unchanged


## Scope
- In scope: game/tsconfig.json
- Out of scope: tests
- Preserve: existing options


## Technical constraints
- Code path: `game/tsconfig.json`


## Dependencies
- REQ-A


## Definition of done
- paths entry added


## Clarifying questions
- None
