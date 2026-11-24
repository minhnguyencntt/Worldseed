---
id: "01M84TCKGG2QAK2T72921KGZN9"
kind: requirement
parent: 01M84TCKGFDT1HRJTYATBJ2CHZ
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# REQ · A guard fails while any tracked path contains node_modules

Context: need regression protection. Desired: assertNoTrackedNodeModules(paths) throws listing offenders when trackedNodeModulesPaths is non-empty.

## Acceptance criteria
- Given a mocked listing containing node_modules/phaser/x.js, when the guard runs, then it throws naming that path.
- Given a listing without node_modules paths, when the guard runs, then it does not throw.


## Scope
- In scope: assertNoTrackedNodeModules in the same module
- Out of scope: Calling real git in tests
- Preserve: Helper behavior


## Technical constraints
- Input is an injected path list


## Dependencies
- REQ1


## Definition of done
- Guard exported


## Clarifying questions
- None
