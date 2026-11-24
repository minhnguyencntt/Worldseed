---
id: "01M843NJMDZ2QMVJ1QHTK36TVB"
kind: unit
parent: 01M843NJMD87BN8FQ0BJJVS341
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Act: Fix .gitignore node_modules path for game/

Context: .gitignore line 10 reads backend/game/node_modules/. Desired behavior: it reads game/node_modules/. Expected result: installing deps in game/ leaves a clean git status. Why: avoid tracking dependencies.

## Acceptance criteria
- Given .gitignore, when read, then line game/node_modules/ is present
- Given .gitignore, when read, then backend/game does not appear


## Scope
- In scope: .gitignore line 10
- Out of scope: other ignore lines
- Preserve: remaining lines


## Technical constraints
- Single-line change
- Code path: `.gitignore`


## Dependencies
- REQ2


## Definition of done
- .gitignore updated


## Clarifying questions
- None
