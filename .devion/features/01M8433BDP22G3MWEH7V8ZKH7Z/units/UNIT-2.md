---
id: "01M8433BDPKA2AQ9X9K2RHCJ46"
kind: unit
parent: 01M8433BDP45EKJRRRV3JF2B9G
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Act: Implement YAML loader and reference validator

Implement loader and validator using the types from backend/game/src/state/types.ts.

## Acceptance criteria
- Given content, when loaded, then typed objects are returned.
- Given bad references, when validated, then errors are listed.


## Scope
- In scope: loader
- In scope: validator
- Out of scope: tests


## Technical constraints
- Use yaml parse
- New file: `backend/game/src/engine/loader.ts`
- New file: `backend/game/src/engine/validator.ts`


## Dependencies
- REQ-LD
- ACT-RT


## Definition of done
- Loader and validator typecheck


## Clarifying questions
- None
