---
id: "01M84SNEWGF2ZTDAXXH2317FGS"
kind: requirement
parent: 01M84SNEWF1XXKBX4438YY20WW
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# REQ · A guard test reads the real package.json and lockfile and asserts 3.90.x

Context: the lockfile root specifier and the cross-file agreement are unchecked. Desired behavior: a guard test reads both real files and asserts the helper returns no problems and that the specifiers agree. Expected result: a regression to 4.x fails the test. Why: closes the SG-4.1.4 done criterion.

## Acceptance criteria
- Given the real files, when the guard test runs, then it passes
- Given the real files, when the test reads lock.packages[''].dependencies.phaser, then it equals package.json dependencies.phaser


## Scope
- In scope: Script to run the guard test
- In scope: New guard test
- Out of scope: Changing versions
- Preserve: Existing scripts in package.json


## Technical constraints
- Test file under game/frontend/tests


## Dependencies
- R1


## Definition of done
- Guard passes on current files


## Clarifying questions
- None
