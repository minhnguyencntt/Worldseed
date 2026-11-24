---
id: "01M84T653733GNHNR148NM3TA2"
kind: intent
parent: null
status: draft
links: []
agent: null
source: llm
evidence: {"project_id":"944dfe9c-3760-4ab1-81a3-865a561626d8"}
---
# SG-4.2.2 · Untrack the tracked node_modules files in game/frontend

Context: about 15,329 files under game/frontend/node_modules (Phaser, its type-generation tests, .vite/vitest/results.json) are still in the git index although .gitignore already holds node_modules/. Desired behavior: a code-level cleanup untracks them with git rm --cached, and a unit test with mocked file listings fails while any dependency path is tracked. Why: vendored Phaser changes must never appear as tracked changes.

## Acceptance criteria
- Given a mocked tracked-file listing containing node_modules paths, when the guard runs, then it fails naming those paths
- Given a listing with no node_modules paths, when the guard runs, then it passes
- Given the cleanup runs, then it uses git rm --cached only and removes nothing from disk


## Scope
- In scope: Helper, cleanup and guard in game/frontend/src/lib
- In scope: Unit tests with a mocked git runner
- Out of scope: Changing .gitignore
- Out of scope: Running git against the real repo in tests
- Preserve: node_modules content on disk
- Preserve: Existing gitignore helper and tests


## Technical constraints
- Vitest with jsdom in game/frontend; tests live in game/frontend/tests
- Git invoked only through an injected runner


## Definition of done
- All three requirements are implemented and verified


## Clarifying questions
- None
