---
id: "01M84SZR3WWGHH0290V6C7G32N"
kind: unit
parent: 01M84SZR3WZAQBSPR47M8X0C14
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Act: Replace game/node_modules/ with node_modules/ in .gitignore

Change the last line of .gitignore from `game/node_modules/` to `node_modules/`.

## Acceptance criteria
- Given the edited .gitignore, then it contains `node_modules/` exactly once
- Given the edited .gitignore, then `game/node_modules/` is absent


## Scope
- In scope: .gitignore
- Out of scope: untracking files
- Preserve: .devion entries


## Technical constraints
- Code path: `.gitignore`


## Definition of done
- Rule replaced


## Clarifying questions
- None
