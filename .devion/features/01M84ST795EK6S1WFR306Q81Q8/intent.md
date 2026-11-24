---
id: "01M84ST795EK6S1WFR306Q81Q8"
kind: intent
parent: null
status: draft
links: []
agent: null
source: llm
evidence: {"project_id":"944dfe9c-3760-4ab1-81a3-865a561626d8"}
---
# SG-4.2 · No tracked changes in vendored Phaser files under node_modules

Context: game/frontend/node_modules is committed (about 15k files, including node_modules/phaser/scripts/tsgen) and root .gitignore only ignores game/node_modules/, which is the wrong path. The git status also shows a conflicted tracked cache file game/frontend/node_modules/.vite/vitest/results.json. Desired behavior: node_modules is ignored everywhere and no node_modules path is tracked, so vendored Phaser files cannot show as modified. Why: Act steps modified vendored tsgen files, which must never appear as product changes.

## Acceptance criteria
- Given the repository, when .gitignore is read, then it ignores node_modules at any depth, including game/frontend/node_modules
- Given the git index, when tracked paths are listed, then none contains a node_modules path segment


## Scope
- In scope: .gitignore ignore rules
- In scope: untracking node_modules from the index
- In scope: a guard helper that detects tracked node_modules paths
- Out of scope: Changing phaser version or its pin
- Out of scope: Editing any file under node_modules
- Preserve: phaser ~3.90.0 pin in package.json and package-lock.json
- Preserve: Existing frontend tests and source


## Technical constraints
- Do not edit vendored files; remove them from the index only, leaving files on disk


## Definition of done
- Both requirements are met and their unit tests pass


## Clarifying questions
- None
