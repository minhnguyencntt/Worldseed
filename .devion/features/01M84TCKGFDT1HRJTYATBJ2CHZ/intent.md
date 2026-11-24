---
id: "01M84TCKGFDT1HRJTYATBJ2CHZ"
kind: intent
parent: null
status: draft
links: []
agent: null
source: llm
evidence: {"project_id":"944dfe9c-3760-4ab1-81a3-865a561626d8"}
---
# SG-4.2.2 Untrack node_modules files in game/frontend with tested cleanup code

Context: about 15,327 files under game/frontend/node_modules (Phaser, type-generation tests, .vite/vitest/results.json) are tracked by git. Desired behavior: a helper in game/frontend/src/lib lists tracked node_modules paths, a cleanup untracks them with git rm -r --cached, and unit tests with mocked git fail while any such path is tracked. Why: dependency files must not be versioned.

## Acceptance criteria
- Given a list of paths, when trackedNodeModulesPaths runs, then it returns only paths with a node_modules segment.
- Given a fake git runner, when untrackNodeModules runs, then it issues 'git rm -r --cached' for node_modules and never deletes files from disk.
- Given a mocked file listing with a node_modules path, when the guard runs, then it throws; given none, it passes.


## Scope
- In scope: game/frontend/src/lib helper module
- In scope: package.json script entry
- In scope: unit tests with mocked git
- Out of scope: Changing .gitignore rules
- Out of scope: Deleting node_modules from disk
- Out of scope: Phaser version changes
- Preserve: Existing src/lib/gitignore.ts and phaserPin.ts
- Preserve: Existing tests


## Technical constraints
- Git runner must be injectable
- Use 'git rm -r --cached' only
- Must also unstage node_modules/.vite/vitest/results.json


## Definition of done
- All three requirements delivered with passing unit tests


## Clarifying questions
- None
