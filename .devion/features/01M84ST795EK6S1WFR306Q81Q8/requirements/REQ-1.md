---
id: "01M84ST795267MA2D71KBND5GQ"
kind: requirement
parent: 01M84ST795EK6S1WFR306Q81Q8
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# REQ · node_modules is ignored at any depth and removed from the git index

Context: .gitignore has game/node_modules/ but dependencies live in game/frontend/node_modules, so they are tracked. Desired behavior: .gitignore contains a pattern matching node_modules directories at any depth and the tracked node_modules files are removed from the index with git rm --cached. Expected result: no vendored Phaser file can show as modified. Why: the intent forbids tracked node_modules changes.

## Acceptance criteria
- Given .gitignore, when its lines are read, then a line node_modules/ is present
- Given the index after the change, when git ls-files is filtered for node_modules, then the list is empty


## Scope
- In scope: .gitignore
- In scope: git index untracking
- Out of scope: Deleting node_modules from disk
- Preserve: Existing .devion ignore rules


## Technical constraints
- Keep existing .gitignore lines


## Definition of done
- Ignore rule present and index clean of node_modules


## Clarifying questions
- None
