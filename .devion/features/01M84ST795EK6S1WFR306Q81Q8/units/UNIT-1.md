---
id: "01M84ST796DTF5JAH95GTC7YMZ"
kind: unit
parent: 01M84ST795267MA2D71KBND5GQ
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Act: Ignore node_modules at any depth and untrack it

Add node_modules/ to .gitignore and remove tracked node_modules from the index, keeping files on disk.

## Acceptance criteria
- Given .gitignore, then a node_modules/ line exists
- Given the index, then no node_modules path is tracked


## Scope
- In scope: .gitignore
- Out of scope: Files under node_modules
- Preserve: Existing ignore lines


## Technical constraints
- Use git rm --cached only; do not delete from disk
- Code path: `.gitignore`


## Definition of done
- node_modules/ ignored; git ls-files has no node_modules paths


## Clarifying questions
- None
