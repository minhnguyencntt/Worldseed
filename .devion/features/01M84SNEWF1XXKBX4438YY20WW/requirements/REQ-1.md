---
id: "01M84SNEWGRWYXCN6PH7WQKWRN"
kind: requirement
parent: 01M84SNEWF1XXKBX4438YY20WW
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# REQ · A pure helper reports phaser versions that are not 3.90.x

Context: no reusable check exists for the phaser pin. Desired behavior: a pure function takes parsed package.json and lockfile objects and returns an array of human-readable problems. Expected result: empty array for 3.90.x everywhere, non-empty for any 4.x or mismatch. Why: lets a regression be proven to fail without editing real files.

## Acceptance criteria
- Given pkg.dependencies.phaser '~3.90.0' and a lock with root specifier '~3.90.0' and node_modules/phaser version '3.90.0', when called, then it returns []
- Given pkg.dependencies.phaser '^4.2.1' or lock version '4.2.1', when called, then the returned array names the offending field


## Scope
- In scope: New src/lib/phaserPin.ts
- Out of scope: Reading files from disk in the helper
- Preserve: src/lib/utils.ts


## Technical constraints
- Pure TypeScript, no new dependencies


## Definition of done
- Helper exported and type-checks


## Clarifying questions
- None
