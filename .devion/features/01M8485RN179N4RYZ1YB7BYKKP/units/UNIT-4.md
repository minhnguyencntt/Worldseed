---
id: "01M8485RN2BKHSBQ9JFW9T00GN"
kind: unit
parent: 01M8485RN28YNNDCHAR9WMG6YV
status: draft
links: []
agent: null
source: llm
evidence: {}
---
# Verify: Current-Round lookup unit tests with mocked fetch

Extend tests/executions.test.ts to cover the pure helper and the async lookup with a URL-routing fetch stub.

## Acceptance criteria
- Test asserts match by round_id, undefined when none, newest on tie
- Test asserts the async lookup uses the current round id


## Scope
- In scope: tests/executions.test.ts
- Out of scope: Product code
- Preserve: Existing tests


## Technical constraints
- Fixtures roundFixture and executionFixture in tests/fixtures/api.ts mirror world.Round JSON and execution.Execution JSON; spread them to vary round_id and updated_at


## Dependencies
- ACT2


## Definition of done
- Tests pass in seconds


## Clarifying questions
- None
