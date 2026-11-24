---
id: "01M84SNEWF1XXKBX4438YY20WW"
kind: intent
parent: null
status: draft
links: []
agent: null
source: llm
evidence: {"project_id":"944dfe9c-3760-4ab1-81a3-865a561626d8"}
---
# SG-4.1.4 Unit test asserts phaser resolves to 3.90.x

Context: game/frontend/package.json declares phaser ~3.90.0 and package-lock.json locks 3.90.0. Existing tests check each file separately and never check that both agree or the lockfile root specifier. Desired behavior: one guard test reads both files and asserts phaser resolves to 3.90.x. Expected result: any change to 4.x in either file fails the test. Why: Phaser 3.90 is a hard stack requirement.

## Acceptance criteria
- Given package.json and package-lock.json on disk, when the guard test runs, then it passes only if phaser resolves to 3.90.x in both
- Given a package.json or lockfile that references phaser 4.x, when the guard check runs, then it reports a problem and the test fails


## Scope
- In scope: Pure phaser pin check helper
- In scope: Guard unit test reading the real files
- Out of scope: Changing the phaser version
- Out of scope: Phaser runtime code
- Preserve: Existing phaserDependency.test.ts and phaserLockfile.test.ts


## Technical constraints
- Vitest in game/frontend/tests, jsdom environment
- Use the aliased NodeURL import with fileURLToPath as existing tests do


## Definition of done
- Guard test exists and passes on the current files
- A 4.x fixture is proven to fail


## Non-functional requirements
- Test runs in under a few seconds


## Clarifying questions
- None
