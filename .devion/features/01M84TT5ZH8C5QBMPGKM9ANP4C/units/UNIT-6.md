---
id: "01M84TT5ZJ71FD99SFZS4FF6AE"
kind: unit
parent: 01M84TT5ZHBN26HBZ1P4G9V2GK
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Verify: test script includes the tracked-dependency guard

Unit test that proves REQ3: the package.json test script runs the guard before vitest.

## Acceptance criteria
- scripts.test includes the guard script path.
- Guard appears before 'vitest run'.


## Scope
- In scope: game/frontend/tests/testScriptGuard.test.ts


## Definition of done
- Test passes


## Clarifying questions
- None
